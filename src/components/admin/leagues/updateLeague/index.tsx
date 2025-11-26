import SectionHeader from '../../../common/Sections/sectionHeader';
import Stack from '@mui/material/Stack';
import GreenButton from '../../../common/Buttons/greenButton';
import AppButton from '../../../common/Buttons/appButton';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import leagueSchema from '../../validations/leagueSchema';
import { useSnackbar } from 'notistack';
import {
  useDeleteAllFromTmp,
  useMoveCfFile,
} from '../../../../api/cloudflare/mutations';
import { useUpdateLeague } from '../../../../api/leagues/mutations';
import { getLeague } from '../../../../api/leagues/queries';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid2';
import BorderedBox from '../../../common/Boxes/borderedBox';
import SelectLeagueType from '../../../common/Selects/selectLeagueType';
import SelectNumber from '../../../common/Selects/selectNumber';
import DialogActions from '@mui/material/DialogActions';
import GrayButton from '../../../common/Buttons/grayButton';
import { TCreateLeagueLogoDto } from '../../../../api/league-logos/types';
import CircularProgress from '@mui/material/CircularProgress';
import Logos from '../../../common/Images/logos';

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
  const { data: league, isError, isLoading } = getLeague(leagueId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading league data</div>;
  if (!league) return <div>No data available</div>;

  // Helpers to prepare logo keys and move temporary files
  const getKeyFromLogo = (logo: string): string => {
    try {
      if (logo.startsWith('http://') || logo.startsWith('https://')) {
        const u = new URL(logo);
        const p = u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
        return p;
      }
      return logo.startsWith('/') ? logo.slice(1) : logo;
    } catch {
      return logo.replace(/^\//, '');
    }
  };

  const prepareLogosForSave = async (
    logos: FormLogo[]
  ): Promise<TCreateLeagueLogoDto[]> => {
    const tasks = logos
      .filter((l) => l.logo && l.start_year !== null)
      .map(async (l) => {
        const rawKey = getKeyFromLogo(l.logo);
        if (rawKey.includes('/tmp/')) {
          const toKey = rawKey.replace('/tmp/', '/leagues/');
          try {
            await moveCfFile({ fromKey: rawKey, toKey });
          } catch (e) {
            // If move fails, still proceed with replaced key to keep consistency
            console.error(
              `Failed to move CF file from ${rawKey} to ${toKey}`,
              e
            );
          }
          return {
            ...(typeof l.id === 'number' ? { id: l.id } : {}),
            logo: toKey,
            start_year: l.start_year as number,
            ...(l.end_year ? { end_year: l.end_year } : {}),
          } as TCreateLeagueLogoDto;
        }
        return {
          ...(typeof l.id === 'number' ? { id: l.id } : {}),
          logo: rawKey,
          start_year: l.start_year as number,
          ...(l.end_year ? { end_year: l.end_year } : {}),
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
        helpers.resetForm({ values });
        onClose();
      } catch {
        enqueueSnackbar('Failed to save league.', { variant: 'error' });
      } finally {
        setSaving(false);
      }
    },
  });

  const handleAddLogo = () => {
    const currentYear = new Date().getFullYear();
    const next = [
      ...formik.values.logos,
      {
        id: undefined,
        start_year: formik.values.start_year || currentYear,
        end_year: null,
        logo: '',
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
      onClose={(_, reason) => {
        if (saving) return; // prevent closing during save
        handleCancel();
      }}
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
                            //logo_id={logo.id}
                            logo={logo.logo}
                            start_year={logo.start_year}
                            end_year={logo.end_year}
                            index={key}
                            onUpdate={handleUpdateLogo}
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
                      icon='photo'
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
                  //disabled={saving}
                />
              </Grid>
              <Grid size={{ xs: 6 }}>
                <SelectNumber
                  value={formik.values.start_year}
                  label='Start Year *'
                  id='start_year'
                  name='start_year'
                  min={1980}
                  max={new Date().getFullYear()}
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
                  max={new Date().getFullYear()}
                  onChange={(value: number) => {
                    formik.setFieldValue('end_year', value);
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
            icon='save'
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
