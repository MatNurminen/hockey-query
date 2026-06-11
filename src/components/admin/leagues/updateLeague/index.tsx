import { useState } from 'react';
import { useLatestSeason } from '../../../../hooks/useLatestSeason';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { getLeague } from '../../../../api/leagues/queries';
import {
  useDeleteAllFromTmp,
  useMoveCfFile,
} from '../../../../api/cloudflare/mutations';
import { useUpdateLeague } from '../../../../api/leagues/mutations';
import { TCreateLeagueLogoDto } from '../../../../api/league-logos/types';
import { getKeyFromLogo } from '../../../utils/urlHelpers';
import leagueSchema from '../../validations/leagueSchema';
import AppButton from '../../../common/Buttons/appButton';
import BorderedBox from '../../../common/Boxes/borderedBox';
import GrayButton from '../../../common/Buttons/grayButton';
import GreenButton from '../../../common/Buttons/greenButton';
import Logos from '../../../common/Images/logos';
import SectionHeader from '../../../common/Sections/sectionHeader';
import SelectLeagueType from '../../../common/Selects/selectLeagueType';
import SelectNumber from '../../../common/Selects/selectNumber';

const bucketPath = import.meta.env.VITE_CF_BUCKET_PATH;
const noImage = import.meta.env.VITE_CG_NO_IMAGE;

export interface UpdateLeagueDialogProps {
  open: boolean;
  onClose: () => void;
  leagueId: number;
}

interface FormLogo {
  id?: number | null;
  start_year: number | null;
  end_year: number | null;
  logo: string;
  league_id: number;
}

interface FormValues {
  name: string;
  short_name: string;
  start_year: number;
  end_year: number | null;
  color: string | null;
  type_id: number;
  logos: FormLogo[];
}

const UpdateLeague = ({ open, onClose, leagueId }: UpdateLeagueDialogProps) => {
  const { mutateAsync: moveCfFile } = useMoveCfFile();
  const { mutate: deleteAllFromTmp } = useDeleteAllFromTmp();
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateLeague } = useUpdateLeague();
  const { startYear } = useLatestSeason();
  const { data: league, isError, isLoading } = getLeague(leagueId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading league data</div>;
  if (!league) return <div>No data available</div>;

  const prepareLogosForSave = async (
    logos: FormLogo[]
  ): Promise<TCreateLeagueLogoDto[]> => {
    const tasks = logos
      .filter((l) => l.logo && l.start_year !== null)
      .map(async (l) => {
        const rawKey = l.logo === noImage ? l.logo : getKeyFromLogo(l.logo);
        if (l.logo !== noImage && rawKey.includes('/tmp/')) {
          const toKey = rawKey.replace('/tmp/', '/leagues/');
          await moveCfFile({ fromKey: rawKey, toKey });
          return {
            ...(typeof l.id === 'number' ? { id: l.id } : {}),
            logo: `${bucketPath}${toKey}`,
            start_year: l.start_year as number,
            ...(l.end_year !== undefined ? { end_year: l.end_year } : {}),
          } as TCreateLeagueLogoDto;
        }
        return {
          ...(typeof l.id === 'number' ? { id: l.id } : {}),
          logo: l.logo === noImage ? rawKey : `${bucketPath}${rawKey}`,
          start_year: l.start_year as number,
          ...(l.end_year !== undefined ? { end_year: l.end_year } : {}),
        } as TCreateLeagueLogoDto;
      });

    return Promise.all(tasks);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      name: league.name,
      short_name: league.short_name,
      start_year: league.start_year,
      end_year: league?.end_year ?? null,
      color: league?.color ?? null,
      type_id: league.type_id,
      logos: league.logos as FormLogo[],
    },
    enableReinitialize: true,
    validationSchema: leagueSchema,
    onSubmit: async (values, helpers) => {
      setSaving(true);
      try {
        const preparedLogos = await prepareLogosForSave(values.logos);

        await updateLeague({
          id: leagueId,
          name: values.name,
          short_name: values.short_name,
          color: values.color,
          start_year: values.start_year,
          end_year: values.end_year,
          type_id: values.type_id,
          logos: preparedLogos,
        });

        enqueueSnackbar('League saved successfully.', { variant: 'success' });
        deleteAllFromTmp();
        onClose();
        helpers.resetForm({ values });
      } catch {
        enqueueSnackbar('Failed to save league.', { variant: 'error' });
      } finally {
        setSaving(false);
      }
    },
  });

  const handleAddLogo = () => {
    const next = [
      ...formik.values.logos,
      {
        id: undefined,
        start_year: formik.values.start_year ?? startYear,
        end_year: null,
        logo: noImage,
        league_id: league.id,
      },
    ];
    formik.setFieldValue('logos', next);
  };

  const handleRemoveLogo = (index: number) => {
    const next = formik.values.logos.filter((_, i) => i !== index);
    formik.setFieldValue('logos', next);
  };

  const handleUpdateLogo = (
    index: number,
    updatedData: Partial<Pick<FormLogo, 'logo' | 'start_year' | 'end_year'>>
  ) => {
    const next = formik.values.logos.map((logo, i) =>
      i === index ? { ...logo, ...updatedData } : logo
    );
    formik.setFieldValue('logos', next);
    const updatedLogo = next[index];
    Object.keys(updatedData).forEach((field) => {
      formik.setFieldTouched(`logos.${index}.${field}`, true);
    });
    setTimeout(() => {
      if (
        updatedLogo.start_year !== null &&
        updatedLogo.end_year !== null &&
        updatedLogo.end_year < updatedLogo.start_year
      ) {
        formik.setFieldError(`logos.${index}.end_year`, 'End year must be after start year');
      } else {
        formik.setFieldError(`logos.${index}.end_year`, undefined);
      }
    }, 0);
  };

  const handleLogoFieldBlur = (field: string) => {
    formik.setFieldTouched(field, true);
  };

  const handleCancel = () => {
    formik.resetForm();
    deleteAllFromTmp();
    onClose();
    enqueueSnackbar("The changes haven't been saved.", { variant: 'info' });
  };

  return (
    <Dialog
      open={open}
      disableRestoreFocus
      onClose={() => {}}
    >
      <DialogContent>
        <SectionHeader txtAlign='left' content='Edit League' />
        <Box position='relative'>
          {saving && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Box
            component='form'
            noValidate
            autoComplete='off'
            onSubmit={formik.handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  required
                  name='name'
                  label='Name'
                  variant='outlined'
                  size='small'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  disabled={saving}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <TextField
                  fullWidth
                  required
                  name='short_name'
                  label='Short Name'
                  variant='outlined'
                  size='small'
                  value={formik.values.short_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.short_name &&
                    Boolean(formik.errors.short_name)
                  }
                  helperText={
                    formik.touched.short_name && formik.errors.short_name
                  }
                  disabled={saving}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <BorderedBox title='League Logos'>
                  <Grid container spacing={2} direction='row' sx={{ mt: 1 }}>
                    {formik.values.logos?.map((logo, key) => (
                      <Grid key={key} size={{ xs: 6 }}>
                        <BorderedBox title={`Logo ${key + 1}`}>
                          <Logos
                            logo={logo.logo}
                            start_year={logo.start_year}
                            end_year={logo.end_year}
                            index={key}
                            onUpdate={handleUpdateLogo}
                            onFieldBlur={handleLogoFieldBlur}
                            startYearError={
                              (formik.errors.logos as any)?.[key]?.start_year
                            }
                            startYearTouched={
                              (formik.touched.logos as any)?.[key]?.start_year
                            }
                            endYearError={
                              (formik.errors.logos as any)?.[key]?.end_year
                            }
                            endYearTouched={
                              (formik.touched.logos as any)?.[key]?.end_year
                            }
                          />
                          <Box sx={{ mt: 1 }}>
                            <AppButton
                              text='Remove Logo'
                              size='small'
                              color='error'
                              onClick={() => handleRemoveLogo(key)}
                              hidden={key === 0}
                              disabled={saving}
                            />
                          </Box>
                        </BorderedBox>
                      </Grid>
                    ))}
                  </Grid>
                  <Box sx={{ mt: 1 }}>
                    <GreenButton
                      text='Add logo'
                      size='small'
                      onClick={handleAddLogo}
                      iconIndex={3}
                      disabled={saving}
                    />
                  </Box>
                </BorderedBox>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <SelectLeagueType
                  id='type_id'
                  name='type_id'
                  label='League Type'
                  value={formik.values.type_id}
                  onChange={(value: number) => {
                    formik.setFieldValue('type_id', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.type_id && Boolean(formik.errors.type_id)
                  }
                  helperText={formik.touched.type_id && formik.errors.type_id}
                  disabled={saving}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <SelectNumber
                  value={formik.values.start_year}
                  label='Start Year *'
                  id='start_year'
                  name='start_year'
                  min={1980}
                  max={startYear}
                  onChange={(value: number) => {
                    formik.setFieldValue('start_year', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.start_year &&
                    Boolean(formik.errors.start_year)
                  }
                  helperText={
                    formik.touched.start_year && formik.errors.start_year
                  }
                  disabled={saving}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <SelectNumber
                  value={formik.values.end_year}
                  label='End Year'
                  id='end_year'
                  name='end_year'
                  min={1980}
                  max={startYear}
                  nullable
                  onChange={(value: number | null) => {
                    formik.setFieldValue('end_year', value);
                    formik.setFieldTouched('end_year', true);
                    setTimeout(() => {
                      if (value !== null && value < formik.values.start_year) {
                        formik.setFieldError('end_year', 'End year must be after start year');
                      } else {
                        formik.setFieldError('end_year', undefined);
                      }
                    }, 0);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.end_year && Boolean(formik.errors.end_year)
                  }
                  helperText={formik.touched.end_year && formik.errors.end_year}
                  disabled={saving}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 5 }}>
        <Stack direction='row' spacing={2}>
          <GreenButton
            text='Save'
            size='small'
            onClick={formik.submitForm}
            iconIndex={1}
            disabled={saving}
          />
          <GrayButton
            text='Cancel'
            size='small'
            onClick={handleCancel}
            disabled={saving}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateLeague;
