import { useMemo, useState } from 'react';
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

export interface AddLeagueDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddLeague = ({ open, onClose }: AddLeagueDialogProps) => {
  const { mutateAsync: addLeague } = useAddLeague();
  const { mutateAsync: moveCfFile } = useMoveCfFile();
  const { mutate: deleteAllFromTmp } = useDeleteAllFromTmp();
  const { enqueueSnackbar } = useSnackbar();

  interface LocalLeagueLogo {
    start_year: number | null;
    end_year: number | null;
    logo: string;
  }

  const [logos, setLogos] = useState<LocalLeagueLogo[]>([
    {
      start_year: 2025,
      end_year: null,
      logo: '',
    },
  ]);

  const validLogos = useMemo(
    () => logos.filter((logo) => logo.logo && logo.start_year !== null),
    [logos]
  );

  const preparedLogos = useMemo<TCreateLeagueLogoDto[]>(
    () =>
      validLogos.map((logo) => ({
        logo: logo.logo,
        start_year: logo.start_year as number,
        end_year: logo.end_year ?? undefined,
      })),
    [validLogos]
  );

  const handleAddLogo = () => {
    setLogos((prevLogos) => [
      ...prevLogos,
      {
        start_year: 2025,
        end_year: null,
        logo: '',
      },
    ]);
  };

  const handleRemoveLogo = (index: number) => {
    setLogos((prevLogos) => prevLogos.filter((_, i) => i !== index));
  };

  const handleUpdateLogo = (
    index: number,
    updatedData: {
      logo?: string;
      start_year?: number | null;
      end_year?: number | null;
    }
  ) => {
    setLogos((prevLogos) =>
      prevLogos.map((logo, i) =>
        i === index ? { ...logo, ...updatedData } : logo
      )
    );
  };

  const processLogos = async (originalLogos: any) => {
    const movePromises = originalLogos.map(
      async (originalItem: { logo: any }) => {
        const url = new URL(originalItem.logo);
        const path = url.pathname.substring(1);
        const fromKey = path;
        const toKey = fromKey.replace('/tmp/', '/leagues/');

        try {
          await moveCfFile({ fromKey, toKey });
          return {
            ...originalItem,
            logo: toKey,
          };
        } catch (error) {
          console.error(`Failed to move file ${fromKey} to ${toKey}:`, error);
          return originalItem;
        }
      }
    );
    return Promise.all(movePromises);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      short_name: '',
      color: undefined,
      start_year: 2025,
      end_year: undefined,
      type_id: 1,
      logos: validLogos,
    },
    validationSchema: leagueSchema,
    onSubmit: async (values) => {
      try {
        processLogos(preparedLogos);
        const modifiedArray = preparedLogos.map((item) => ({
          ...item,
          logo: item.logo.replace('/tmp/', '/leagues/'),
        }));
        const result = await addLeague({
          ...values,
          logos: modifiedArray,
        });
        if (result.id) {
          enqueueSnackbar(
            `League added successfully with name: ${result.name}`,
            {
              variant: 'success',
            }
          );
          handleClose(true);
        }
      } catch (error) {
        enqueueSnackbar('Failed to add league', { variant: 'error' });
      }
    },
  });

  const handleClose = (isSubmitSuccess = false) => {
    deleteAllFromTmp();
    if (!isSubmitSuccess) {
      enqueueSnackbar("League didn't add.", { variant: 'error' });
    }
    onClose();
    formik.resetForm();
    setLogos([
      {
        start_year: 2025,
        end_year: null,
        logo: '',
      },
    ]);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <SectionHeader txtAlign='left' content='Add League' />
        <Box component='form' noValidate autoComplete='off'>
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
                  formik.touched.short_name && Boolean(formik.errors.short_name)
                }
                helperText={
                  formik.touched.short_name && formik.errors.short_name
                }
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <BorderedBox title='League Logos'>
                <Grid container spacing={2} direction='row' sx={{ mt: 1 }}>
                  {logos?.map((logo: any, key: any) => (
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
                  />
                </Box>
              </BorderedBox>
            </Grid>
            {/* <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                name='color'
                label='Color'
                variant='outlined'
                size='small'
                onChange={formik.handleChange}
              />
            </Grid> */}

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
                error={formik.touched.type_id && Boolean(formik.errors.type_id)}
                helperText={formik.touched.type_id && formik.errors.type_id}
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
                  formik.touched.start_year && Boolean(formik.errors.start_year)
                }
                helperText={
                  formik.touched.start_year && formik.errors.start_year
                }
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
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 5 }}>
        <Stack direction='row' spacing={2}>
          <GreenButton
            text='Save'
            size='small'
            onClick={formik.handleSubmit}
            iconIndex={1}
          />
          <GrayButton
            text='Cancel'
            size='small'
            onClick={() => handleClose()}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddLeague;
