import { useState } from 'react';
import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SectionHeader from '../../../common/Sections/sectionHeader';
import DialogActions from '@mui/material/DialogActions';
import GreenButton from '../../../common/Buttons/greenButton';
import { useFormik } from 'formik';
import leagueSchema from '../../validations/leagueSchema';
import GrayButton from '../../../common/Buttons/grayButton';
import Stack from '@mui/material/Stack';
import { useAddLeague } from '../../../../api/leagues/mutations';
import SelectNumber from '../../../common/Selects/selectNumber';
import Grid from '@mui/material/Grid2';
import BorderedBox from '../../../common/Boxes/borderedBox';
import {
  useDeleteAllFromTmp,
  useMoveCfFile,
} from '../../../../api/cloudflare/mutations';
import SelectLeagueType from '../../../common/Selects/selectLeagueType';
import { TCreateLeagueLogoDto } from '../../../../api/league-logos/types';
import RedButton from '../../../common/Buttons/redButton';
import Logos from '../../../common/Images/logos';
import CircularProgress from '@mui/material/CircularProgress';

export interface AddLeagueDialogProps {
  open: boolean;
  onClose: () => void;
}

const DEFAULT_START_YEAR = new Date().getFullYear() + 1;

interface FormLogo {
  start_year: number | null;
  end_year: number | null;
  logo: string;
}

const AddLeague = ({ open, onClose }: AddLeagueDialogProps) => {
  const { mutateAsync: addLeague } = useAddLeague();
  const { mutateAsync: moveCfFile } = useMoveCfFile();
  const { mutate: deleteAllFromTmp } = useDeleteAllFromTmp();
  const { enqueueSnackbar } = useSnackbar();
  const [saving, setSaving] = useState(false);

  const getKeyFromLogo = (logo: string): string => {
    try {
      if (logo.startsWith('http://') || logo.startsWith('https://')) {
        const u = new URL(logo);
        const p = u.pathname.startsWith('/') ? u.pathname.slice(1) : u.pathname;
        return p;
      }
      return logo.startsWith('/') ? logo.slice(1) : logo;
    } catch (e) {
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
          await moveCfFile({ fromKey: rawKey, toKey });
          return {
            logo: toKey,
            start_year: l.start_year as number,
            ...(l.end_year ? { end_year: l.end_year } : {}),
          };
        }
        // This case should ideally not happen in "Add" form, but good for safety
        return {
          logo: rawKey,
          start_year: l.start_year as number,
          ...(l.end_year ? { end_year: l.end_year } : {}),
        };
      });

    // This will throw an error if any moveCfFile fails, stopping the submission.
    return Promise.all(tasks);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      short_name: '',
      color: '',
      start_year: DEFAULT_START_YEAR,
      end_year: null,
      type_id: 1,
      logos: [
        {
          start_year: DEFAULT_START_YEAR,
          end_year: null,
          logo: '',
        },
      ] as FormLogo[],
    },
    validationSchema: leagueSchema,
    onSubmit: async (values, helpers) => {
      setSaving(true);
      try {
        const preparedLogos = await prepareLogosForSave(values.logos);
        const result = await addLeague({
          name: values.name,
          short_name: values.short_name,
          color: values.color,
          start_year: values.start_year,
          end_year: values.end_year,
          type_id: values.type_id,
          logos: preparedLogos,
        });

        if (result.id) {
          enqueueSnackbar(
            `League added successfully with name: ${result.name}`,
            { variant: 'success' }
          );
          deleteAllFromTmp(); // Clean up on success
          helpers.resetForm();
          onClose();
        }
      } catch (error) {
        console.error('Failed to add league:', error);
        enqueueSnackbar('Failed to add league. Check console for details.', {
          variant: 'error',
        });
      } finally {
        setSaving(false);
      }
    },
  });

  const handleAddLogo = () => {
    const next = [
      ...formik.values.logos,
      {
        start_year: formik.values.start_year || DEFAULT_START_YEAR,
        end_year: null,
        logo: '',
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
    deleteAllFromTmp(); // Clean up on cancel
    enqueueSnackbar("The changes haven't been saved.", { variant: 'info' });
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(_event, reason) => {
        if (reason !== 'backdropClick') {
          // Обрабатываем закрытие только по нажатию ESC или программно
          handleCancel();
        }
      }}
      // onClose={(_, reason) => {
      //   if (reason === 'backdropClick' && saving) return; // Prevent closing during save
      //   handleCancel();
      // }}
    >
      <DialogContent>
        <SectionHeader txtAlign='left' content='Add League' />
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
                          />
                          <Box sx={{ mt: 1 }}>
                            <RedButton
                              text='Remove Logo'
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

export default AddLeague;
