import { useCallback, useState } from 'react';
import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SectionHeader from '../../../common/Sections/sectionHeader';
import DialogActions from '@mui/material/DialogActions';
import GreenButton from '../../../common/Buttons/greenButton';
import { useFormik } from 'formik';
import GrayButton from '../../../common/Buttons/grayButton';
import Stack from '@mui/material/Stack';
import SelectNumber from '../../../common/Selects/selectNumber';
import Grid from '@mui/material/Grid2';
import BorderedBox from '../../../common/Boxes/borderedBox';
import {
  useDeleteAllFromTmp,
  useMoveCfFile,
} from '../../../../api/cloudflare/mutations';
import AppButton from '../../../common/Buttons/appButton';
import Logos from '../../../common/Images/logos';
import { useAddTeam } from '../../../../api/teams/mutations';
import SelectNation from '../../../common/Selects/selectNation';
import { TCreateTeamLogoDto } from '../../../../api/team-logos/types';
import { getKeyFromLogo } from '../../../utils/urlHelpers';
import teamSchema from '../../validations/teamSchema';
import CircularProgress from '@mui/material/CircularProgress';
import SelectCfSubfolder from '../../../common/Selects/selectCfSubfolder';
import { useLatestSeason } from '../../../../hooks/useLatestSeason';

export interface AddTeamDialogProps {
  open: boolean;
  onClose: () => void;
}

interface FormLogo {
  start_year: number | null;
  end_year: number | null;
  logo: string;
}

interface FormValues {
  full_name: string;
  name: string;
  short_name: string;
  start_year: number;
  end_year: number | null;
  nation_id: number;
  logos: FormLogo[];
}

const AddTeam = ({ open, onClose }: AddTeamDialogProps) => {
  const [saving, setSaving] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');
  const { mutateAsync: addTeam } = useAddTeam();
  const { mutateAsync: moveCfFile } = useMoveCfFile();
  const { mutate: deleteAllFromTmp } = useDeleteAllFromTmp();
  const { enqueueSnackbar } = useSnackbar();
  const { startYear } = useLatestSeason();
  const noImage = import.meta.env.VITE_CG_NO_IMAGE;
  const bucketPath = import.meta.env.VITE_CF_BUCKET_PATH;

  const prepareLogosForSave = async (
    logos: FormLogo[],
  ): Promise<TCreateTeamLogoDto[]> => {
    const tasks = logos
      .filter((l) => l.logo && l.start_year !== null)
      .map(async (l) => {
        const rawKey = l.logo === noImage ? l.logo : getKeyFromLogo(l.logo);
        if (l.logo !== noImage && rawKey.includes('/tmp/')) {
          const toKey = rawKey.replace('/tmp/', `/teams/${selectedFolder}/`);
          await moveCfFile({ fromKey: rawKey, toKey });
          return {
            logo: `${bucketPath}${toKey}`,
            start_year: l.start_year as number,
            ...(l.end_year !== undefined ? { end_year: l.end_year } : {}),
          };
        }
        return {
          logo: l.logo === noImage ? rawKey : `${bucketPath}${rawKey}`,
          start_year: l.start_year as number,
          ...(l.end_year !== undefined ? { end_year: l.end_year } : {}),
        };
      });
    return Promise.all(tasks);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      full_name: '',
      name: '',
      short_name: '',
      start_year: startYear,
      end_year: null,
      nation_id: 1,
      logos: [
        {
          start_year: startYear,
          end_year: null,
          logo: noImage,
        },
      ],
    },
    enableReinitialize: true,
    validationSchema: teamSchema,
    onSubmit: async (values, helpers) => {
      if (!selectedFolder) {
        enqueueSnackbar('Please select a folder.', { variant: 'warning' });
        return;
      }
      setSaving(true);
      try {
        const preparedLogos = await prepareLogosForSave(values.logos);
        const result = await addTeam({
          full_name: values.full_name,
          name: values.name,
          short_name: values.short_name,
          start_year: values.start_year,
          end_year: values.end_year,
          nation_id: values.nation_id,
          logos: preparedLogos,
        });

        enqueueSnackbar(`Team added successfully with name: ${result.name}`, {
          variant: 'success',
        });
        deleteAllFromTmp();
        onClose();
        helpers.resetForm();
      } catch (e) {
        enqueueSnackbar('Failed to add team.', { variant: 'error' });
      } finally {
        setSaving(false);
      }
    },
  });

  const handleAddLogo = () => {
    const next = [
      ...formik.values.logos,
      {
        start_year: formik.values.start_year ?? startYear,
        end_year: null,
        logo: noImage,
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
    updatedData: Partial<Pick<FormLogo, 'logo' | 'start_year' | 'end_year'>>,
  ) => {
    const next = formik.values.logos.map((logo, i) =>
      i === index ? { ...logo, ...updatedData } : logo,
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
        formik.setFieldError(
          `logos.${index}.end_year`,
          'End year must be after start year',
        );
      } else {
        formik.setFieldError(`logos.${index}.end_year`, undefined);
      }
    }, 0);
  };

  const handleLogoFieldBlur = (field: string) => {
    formik.setFieldTouched(field, true);
  };

  const handleCancel = () => {
    deleteAllFromTmp();
    enqueueSnackbar("The changes haven't been saved.", { variant: 'info' });
    formik.resetForm();
    onClose();
  };

  const handleNationChange = useCallback(
    (value: number) => {
      formik.setFieldValue('nation_id', value);
    },
    [formik],
  );

  return (
    <Dialog open={open} disableRestoreFocus onClose={() => {}}>
      <DialogContent>
        <SectionHeader txtAlign='left' content='Add Team' />
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
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  required
                  name='full_name'
                  label='Full Name'
                  variant='outlined'
                  size='small'
                  value={formik.values.full_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.full_name && Boolean(formik.errors.full_name)
                  }
                  helperText={
                    formik.touched.full_name && formik.errors.full_name
                  }
                  disabled={saving}
                />
              </Grid>
              <Grid size={{ xs: 8 }}>
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
              <Grid size={{ xs: 4 }}>
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
                <SelectCfSubfolder
                  value={selectedFolder}
                  onChange={setSelectedFolder}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <BorderedBox title='Team Logos'>
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
                              color='error'
                              size='small'
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
                <SelectNation
                  id='nation_id'
                  name='nation_id'
                  value={formik.values.nation_id}
                  label='Nation *'
                  onChange={handleNationChange}
                  onBlur={formik.handleBlur}
                  errorId={
                    formik.touched.nation_id && Boolean(formik.errors.nation_id)
                  }
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
                        formik.setFieldError(
                          'end_year',
                          'End year must be after start year',
                        );
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

export default AddTeam;
