import { useSnackbar } from 'notistack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SectionHeader from '../../../common/Sections/sectionHeader';
import DialogActions from '@mui/material/DialogActions';
import GreenButton from '../../../common/Buttons/greenButton';
import { useFormik } from 'formik';
import nationSchema from '../../validations/nationSchema';
import GrayButton from '../../../common/Buttons/grayButton';
import Stack from '@mui/material/Stack';
import { useAddNation } from '../../../../api/nations/mutations';
import Grid from '@mui/material/Grid2';
import BorderedBox from '../../../common/Boxes/borderedBox';
import SbUploadFile from '../../../common/Supabase/sbUploadFile';
import { useState } from 'react';
import SelectColor from '../../../common/Colors/selectColor';
import BlueButton from '../../../common/Buttons/blueButton';
import {
  useDeleteAllFromTmp,
  useMoveCfFile,
} from '../../../../api/cloudflare/mutations';
import { waitForImageAvailable } from '../../../utils/waitForImageAvailable';
import CircularProgress from '@mui/material/CircularProgress';

export interface AddNationDialogProps {
  open: boolean;
  onClose: () => void;
}

const bucketPath = import.meta.env.VITE_CF_BUCKET_PATH;
const rootFolder = import.meta.env.VITE_CF_ROOT_FOLDER;
const noImage = import.meta.env.VITE_CG_NO_IMAGE;

const AddNation = (props: AddNationDialogProps) => {
  const { mutateAsync: addNation } = useAddNation();
  const { mutateAsync: moveCfFile } = useMoveCfFile();
  const { mutate: deleteAllFromTmp } = useDeleteAllFromTmp();
  const { onClose, open } = props;
  const [tmpFlagPath, setTmpFlagPath] = useState('');
  const [tmpLogoPath, setTmpLogoPath] = useState('');
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [openColor, setOpenColor] = useState(false);

  const handleOpenColor = () => setOpenColor(true);
  const handleCloseColor = () => setOpenColor(false);

  const handleColorChange = (color: string) => {
    formik.setFieldValue('color', color);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      short_name: '',
      flag: noImage,
      logo: noImage,
      color: undefined,
    },
    validationSchema: nationSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        let finalFlagPath = formik.values.flag;
        let finalLogoPath = formik.values.logo;

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

        const result = await addNation({
          ...values,
          flag: finalFlagPath,
          logo: finalLogoPath,
        });
        if (result.id) {
          enqueueSnackbar(
            `Nation added successfully with name: ${result.name}`,
            {
              variant: 'success',
            }
          );
          setTmpFlagPath('');
          setTmpLogoPath('');
          formik.resetForm();
          deleteAllFromTmp();
          setSaving(false);
          onClose();
        }
      } catch (e) {
        enqueueSnackbar('Failed to save nation.', { variant: 'error' });
      } finally {
        setSaving(false);
      }
    },
  });

  const handleFlagUpload = async (filePath: string) => {
    const url = `${bucketPath}${filePath}`;
    setLoadingFlag(true);
    try {
      await waitForImageAvailable(url);
      formik.setFieldValue('flag', url);
      setTmpFlagPath(filePath);
    } catch (e) {
      enqueueSnackbar('Failed to load image from storage.', {
        variant: 'error',
      });
    } finally {
      setLoadingFlag(false);
    }
  };

  const handleLogoUpload = async (filePath: string) => {
    const url = `${bucketPath}${filePath}`;
    setLoadingLogo(true);
    try {
      await waitForImageAvailable(url);
      formik.setFieldValue('logo', url);
      setTmpLogoPath(filePath);
    } catch (e) {
      enqueueSnackbar('Failed to load image from storage.', {
        variant: 'error',
      });
    } finally {
      setLoadingLogo(false);
    }
  };

  const showCancelSnackbar = () => {
    enqueueSnackbar("Nation didn't add.", { variant: 'error' });
  };

  const handleClose = () => {
    formik.resetForm();
    setTmpFlagPath('');
    setTmpLogoPath('');
    deleteAllFromTmp();
    onClose();
    showCancelSnackbar();
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <SectionHeader txtAlign='left' content='Add Nation' />
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
                            : formik.values.flag || noImage
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
                      //helperText={formik.touched.flag && formik.errors.flag}
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
                            : formik.values.logo || noImage
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
                      //helperText={formik.touched.logo && formik.errors.logo}
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
                      value={formik.values.color || ''}
                    />
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: formik.values.color || '#fff',
                        border: '2px solid #ccc',
                      }}
                    />
                  </Stack>
                  <BlueButton
                    text='Select color'
                    iconIndex={2}
                    size='small'
                    component='label'
                    onClick={handleOpenColor}
                  />
                </Stack>
                <SelectColor
                  open={openColor}
                  onClose={handleCloseColor}
                  onColorChange={handleColorChange}
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
            iconIndex={1}
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

export default AddNation;
