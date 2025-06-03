import SectionHeader from '../../../common/Sections/sectionHeader';
import Stack from '@mui/material/Stack';
import GreenButton from '../../../common/Buttons/greenButton';
import RedButton from '../../../common/Buttons/redButton';
import { useMemo, useState } from 'react';
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

const UpdateLeague = ({ open, onClose, leagueId }: UpdateLeagueDialogProps) => {
  const { mutateAsync: moveCfFile } = useMoveCfFile();
  const { mutate: deleteAllFromTmp } = useDeleteAllFromTmp();
  // const [tmpFlagPath, setTmpFlagPath] = useState('');
  // const [tmpLogoPath, setTmpLogoPath] = useState('');
  // const [loadingFlag, setLoadingFlag] = useState(false);
  // const [loadingLogo, setLoadingLogo] = useState(false);
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateLeague } = useUpdateLeague();
  const { data: league, isError, isLoading } = getLeague(leagueId);
  //const [openColor, setOpenColor] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading nation data</div>;
  if (!league) return <div>No data available</div>;

  // const handleOpenColor = () => setOpenColor(true);
  // const handleCloseColor = () => setOpenColor(false);

  // const handleColorChange = (color: string) => {
  //   formik.setFieldValue('color', color);
  // };

  interface LocalLeagueLogo {
    id?: number | null;
    start_year: number | null;
    end_year: number | null;
    logo: string;
    league_id: number;
  }

  const [logos, setLogos] = useState<LocalLeagueLogo[]>(league.logos);

  const validLogos = useMemo(
    () => logos.filter((logo) => logo.logo && logo.start_year !== null),
    [logos]
  );

  // const preparedLogos = useMemo<TCreateLeagueLogoDto[]>(
  //   () =>
  //     validLogos.map((logo) => ({
  //       id: logo.id || null,
  //       logo: logo.logo,
  //       start_year: logo.start_year as number,
  //       end_year: logo.end_year ?? undefined,
  //     })),
  //   [validLogos]
  // );
  const preparedLogos = useMemo<TCreateLeagueLogoDto[]>(
    () =>
      validLogos.map(({ id, logo, start_year, end_year }) => {
        if (typeof id === 'number') {
          return {
            id,
            logo,
            start_year: start_year as number,
            end_year: end_year ?? undefined,
          };
        } else {
          return {
            logo,
            start_year: start_year as number,
            end_year: end_year ?? undefined,
          };
        }
      }),
    [validLogos]
  );

  const handleAddLogo = () => {
    setLogos((prevLogos) => [
      ...prevLogos,
      {
        start_year: 2025,
        end_year: null,
        logo: '',
        league_id: league.id,
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
      name: league.name,
      short_name: league.short_name,
      start_year: league.start_year,
      end_year: league?.end_year || null,
      color: league?.color || null,
      type_id: league.type_id,
      logos,
    },
    enableReinitialize: true,
    validationSchema: leagueSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        processLogos(preparedLogos);

        const modifiedArray = preparedLogos.map((item) => {
          const cleaned = {
            ...item,
            logo: item.logo.replace('/tmp/', '/leagues/'),
          };
          if (!cleaned.id) {
            delete cleaned.id;
          }
          return cleaned;
        });

        await updateLeague(
          {
            id: leagueId,
            name: values.name,
            short_name: values.short_name,
            color: values.color,
            start_year: values.start_year,
            end_year: values.end_year,
            type_id: values.type_id,
            logos: modifiedArray,
          },
          {
            onSuccess: () => {
              formik.resetForm();
              deleteAllFromTmp();
              onClose();
            },
          }
        );
      } catch (e) {
        enqueueSnackbar('Failed to save league.', { variant: 'error' });
      } finally {
        setSaving(false);
      }
      onClose();
    },
  });

  const handleClose = () => {
    formik.resetForm();
    deleteAllFromTmp();
    onClose();
    enqueueSnackbar("The changes haven't been saved.", { variant: 'error' });
  };

  return (
    <Dialog open={open}>
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
                    formik.touched.short_name &&
                    Boolean(formik.errors.short_name)
                  }
                  helperText={
                    formik.touched.short_name && formik.errors.short_name
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <BorderedBox title='League Logos'>
                  <Grid container spacing={2} direction='row' sx={{ mt: 1 }}>
                    {formik.values.logos?.map((logo: any, key: any) => (
                      <Grid key={key} size={{ xs: 6 }}>
                        <BorderedBox title={`Logo ${key + 1}`}>
                          <Logos
                            logo_id={logo.id}
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
                value={formik.values.color}
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
                  error={
                    formik.touched.type_id && Boolean(formik.errors.type_id)
                  }
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
                    formik.touched.start_year &&
                    Boolean(formik.errors.start_year)
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

export default UpdateLeague;
