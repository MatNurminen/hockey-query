import SectionHeader from '../../../common/Sections/sectionHeader';
import Stack from '@mui/material/Stack';
import GreenButton from '../../../common/Buttons/greenButton';
import GrayButton from '../../../common/Buttons/grayButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import nationSchema from '../../validations/nationSchema';
import { useSnackbar } from 'notistack';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { getNation } from '../../../../api/nations/queries';
import SbUploadFile from '../../../common/Supabase/sbUploadFile';
import Grid from '@mui/material/Grid2';
import BorderedBox from '../../../common/Boxes/borderedBox';
import { useState } from 'react';
import { useUpdateNation } from '../../../../api/nations/mutations';
import BlueButton from '../../../common/Buttons/blueButton';
import SelectColor from '../../../common/Colors/selectColor';
import {
  useDeleteAllFromTmp,
  useMoveCfFile,
} from '../../../../api/cloudflare/mutations';
import CircularProgress from '@mui/material/CircularProgress';

export interface UpdateNationDialogProps {
  open: boolean;
  onClose: () => void;
  nationId: number;
}

const bucketPath = import.meta.env.VITE_CF_BUCKET_PATH;
const rootFolder = import.meta.env.VITE_CF_ROOT_FOLDER;

const UpdateNation = ({ onClose, open, nationId }: UpdateNationDialogProps) => {
  const { mutateAsync: moveCfFile } = useMoveCfFile();
  const { mutate: deleteAllFromTmp } = useDeleteAllFromTmp();
  const [tmpFlagPath, setTmpFlagPath] = useState('');
  const [tmpLogoPath, setTmpLogoPath] = useState('');
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: updateNation } = useUpdateNation();
  const { data: nation, isError, isLoading } = getNation(nationId);
  const [openColor, setOpenColor] = useState(false);

  const handleOpenColor = () => setOpenColor(true);
  const handleCloseColor = () => setOpenColor(false);

  const handleColorChange = (color: string) => {
    formik.setFieldValue('color', color);
  };

  const formik = useFormik({
    initialValues: {
      name: nation?.name || '',
      short_name: nation?.short_name || '',
      flag: nation?.flag || '',
      logo: nation?.logo || '',
      color: nation?.color || null,
    },
    enableReinitialize: true,
    validationSchema: nationSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        let finalFlagPath = values.flag;
        let finalLogoPath = values.logo;

        if (tmpFlagPath) {
          const fileName = tmpFlagPath.split('/').pop() || '';
          const newPath = `flags/${fileName}`;
          await moveCfFile({
            fromKey: `${rootFolder}tmp/${fileName}`,
            toKey: `${rootFolder}${newPath}`,
          });
          finalFlagPath = `${bucketPath}${rootFolder}${newPath}`;
        }

        if (tmpLogoPath) {
          const fileName = tmpLogoPath.split('/').pop() || '';
          const newPath = `jerseys/${fileName}`;
          await moveCfFile({
            fromKey: `${rootFolder}tmp/${fileName}`,
            toKey: `${rootFolder}${newPath}`,
          });
          finalLogoPath = `${bucketPath}${rootFolder}${newPath}`;
        }

        await updateNation(
          {
            id: nationId,
            name: values.name,
            short_name: values.short_name,
            flag: finalFlagPath,
            logo: finalLogoPath,
            color: values.color,
          },
          {
            onSuccess: () => {
              setTmpFlagPath('');
              setTmpLogoPath('');
              formik.resetForm();
              deleteAllFromTmp();
              onClose();
            },
          }
        );
      } catch (e) {
        enqueueSnackbar('Failed to save nation.', { variant: 'error' });
      } finally {
        setSaving(false);
      }
    },
  });

  const handleFlagUpload = (filePath: string) => {
    setLoadingFlag(true);
    try {
      setTmpFlagPath(filePath);
      formik.setFieldValue('flag', `${bucketPath}${filePath}`);
    } catch (e) {
      enqueueSnackbar('Failed to load image from storage.', {
        variant: 'error',
      });
    } finally {
      setLoadingFlag(false);
    }
  };

  const handleLogoUpload = (filePath: string) => {
    setLoadingLogo(true);
    try {
      setTmpLogoPath(filePath);
      formik.setFieldValue('logo', `${bucketPath}${filePath}`);
    } catch (e) {
      enqueueSnackbar('Failed to load image from storage.', {
        variant: 'error',
      });
    } finally {
      setLoadingLogo(false);
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setTmpFlagPath('');
    setTmpLogoPath('');
    deleteAllFromTmp();
    onClose();
    enqueueSnackbar("The changes haven't been saved.", { variant: 'error' });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading nation data</div>;
  if (!nation) return <div>No data available</div>;

  return (
    <Dialog open={open}>
      <DialogContent>
        <SectionHeader txtAlign='left' content='Edit Nation' />
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
              <Grid size={{ xs: 6 }}>
                <BorderedBox title='Flag *'>
                  <Stack spacing={2} alignItems={'center'}>
                    {loadingFlag ? (
                      <CircularProgress />
                    ) : (
                      <Box
                        component='img'
                        src={
                          tmpFlagPath
                            ? `${bucketPath}${tmpFlagPath}`
                            : formik.values.flag
                        }
                        alt='flag'
                        sx={{ height: '50px', objectFit: 'contain' }}
                      />
                    )}
                    <TextField
                      sx={{ display: 'none' }}
                      required
                      name='flag'
                      label='Flag'
                      variant='outlined'
                      size='small'
                      value={formik.values.flag}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.flag && Boolean(formik.errors.flag)}
                      helperText={formik.touched.flag && formik.errors.flag}
                    />
                    <SbUploadFile onFileUpload={handleFlagUpload} />
                  </Stack>
                </BorderedBox>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <BorderedBox title='Logo *'>
                  <Stack spacing={2} alignItems={'center'}>
                    {loadingLogo ? (
                      <CircularProgress />
                    ) : (
                      <Box
                        component='img'
                        src={
                          tmpLogoPath
                            ? `${bucketPath}${tmpLogoPath}`
                            : formik.values.logo
                        }
                        alt='logo'
                        sx={{ height: '50px', objectFit: 'contain' }}
                      />
                    )}
                    <TextField
                      sx={{ display: 'none' }}
                      required
                      name='logo'
                      label='Logo'
                      variant='outlined'
                      size='small'
                      value={formik.values.logo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.logo && Boolean(formik.errors.logo)}
                      helperText={formik.touched.logo && formik.errors.logo}
                    />
                    <SbUploadFile onFileUpload={handleLogoUpload} />
                  </Stack>
                </BorderedBox>
              </Grid>
              <BorderedBox title='Color'>
                <Stack alignItems='center' spacing={2}>
                  <Stack direction='row' alignItems='center' spacing={2}>
                    <TextField
                      disabled
                      name='color'
                      variant='outlined'
                      size='small'
                      value={formik.values.color}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.color && Boolean(formik.errors.color)
                      }
                      helperText={formik.touched.color && formik.errors.color}
                    />
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: formik.values.color || '#ffffff',
                        border: '2px solid #ccc',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      }}
                    />
                  </Stack>
                  <BlueButton
                    text='Select color'
                    iconIndex={2}
                    size='small'
                    onClick={handleOpenColor}
                  />
                </Stack>
                <SelectColor
                  open={openColor}
                  onClose={handleCloseColor}
                  onColorChange={handleColorChange}
                  onCancel={handleCloseColor}
                  initialColor={formik.values.color || '#ffffff'}
                  title='Выберите цвет нации'
                  disableAlpha={true}
                />
              </BorderedBox>
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
            iconIndex={2}
            disabled={saving}
          />
          <GrayButton
            text='Cancel'
            size='small'
            onClick={handleClose}
            disabled={saving}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateNation;
