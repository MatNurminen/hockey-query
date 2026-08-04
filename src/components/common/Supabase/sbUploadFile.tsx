import { useSnackbar } from 'notistack';
import AppButton from '../Buttons/appButton';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid2';
import { useUploadCfFile } from '../../../api/cloudflare/mutations';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface SbUploadFileProps {
  onFileUpload: (filePath: string) => void;
}

const SbUploadFile = ({ onFileUpload }: SbUploadFileProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: uploadCfFile, isPending } = useUploadCfFile();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files?.[0]) return;

    const file = event.target.files[0];
    event.target.value = '';

    uploadCfFile(
      { file, folder: 'tmp' },
      {
        onSuccess: (data) => {
          onFileUpload(data.key);
        },
        onError: (error) => {
          console.error('Upload error:', error);
          enqueueSnackbar('File upload failed', { variant: 'error' });
        },
      }
    );
  };

  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      <Grid size={12} sx={{ textAlign: 'left' }}>
        <FormControl fullWidth size='small'>
          <AppButton
            text={isPending ? 'Uploading...' : 'Upload file'}
            iconName='cloudUpload'
            size='small'
            component='label'
            disabled={isPending}
          >
            <VisuallyHiddenInput
              type='file'
              onChange={handleFileChange}
            />
          </AppButton>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SbUploadFile;
