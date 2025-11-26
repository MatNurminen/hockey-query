import { useCallback, useMemo, useState } from 'react';
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
import teamSchema from '../../validations/teamSchema';
import CircularProgress from '@mui/material/CircularProgress';
import SelectCfSubfolder from '../../../common/Selects/selectCfSubfolder';

export interface AddTeamDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddTeam = ({ open, onClose }: AddTeamDialogProps) => {
  const [saving, setSaving] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('');
  const { mutateAsync: addTeam } = useAddTeam();
  const { mutateAsync: moveCfFile } = useMoveCfFile();
  const { mutate: deleteAllFromTmp } = useDeleteAllFromTmp();
  const { enqueueSnackbar } = useSnackbar();

  interface LocalTeamLogo {
    start_year: number | null;
    end_year: number | null;
    logo: string;
  }

  const [logos, setLogos] = useState<LocalTeamLogo[]>([
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

  const preparedLogos = useMemo<TCreateTeamLogoDto[]>(
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
        const toKey = fromKey.replace('/tmp/', `/teams/${selectedFolder}/`);

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
      full_name: '',
      name: '',
      short_name: '',
      start_year: 2025,
      end_year: undefined,
      nation_id: 1,
      logos: validLogos,
    },
    validationSchema: teamSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        processLogos(preparedLogos);
        const modifiedArray = preparedLogos.map((item) => ({
          ...item,
          logo: item.logo.replace('/tmp/', `/teams/${selectedFolder}/`),
        }));
        const result = await addTeam({
          ...values,
          logos: modifiedArray,
        });

        // const result = {
        //   ...values,
        //   logos: modifiedArray,
        // };
        // console.log('result', result);

        if (result.id) {
          enqueueSnackbar(`Team added successfully with name: ${result.name}`, {
            variant: 'success',
          });
          setSaving(false);
          handleClose(true);
        }
      } catch (e) {
        enqueueSnackbar('Failed to add team', { variant: 'error' });
      } finally {
        setSaving(false);
      }
    },
  });

  const handleClose = (isSubmitSuccess = false) => {
    deleteAllFromTmp();
    if (!isSubmitSuccess) {
      enqueueSnackbar("Team didn't add.", { variant: 'error' });
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

  const handleNationChange = useCallback(
    (value: number) => {
      formik.setFieldValue('nation_id', value);
    },
    [formik]
  );

  return (
    <Dialog open={open}>
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
          <Box component='form' noValidate autoComplete='off'>
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
                />
              </Grid>
              <SelectCfSubfolder
                value={selectedFolder}
                onChange={setSelectedFolder}
              />
              <div>Выбрано: {selectedFolder}</div>
              <Grid size={{ xs: 12 }}>
                <BorderedBox title='Team Logos'>
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
                            <AppButton
                              text='Remove Logo'
                              size='small'
                              color='error'
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

export default AddTeam;
