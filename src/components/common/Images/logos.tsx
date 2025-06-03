import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSnackbar } from 'notistack';
import { waitForImageAvailable } from '../../utils/waitForImageAvailable';
import SbUploadFile from '../../common/Supabase/sbUploadFile';
import SelectNumber from '../../common/Selects/selectNumber';

const bucketPath = import.meta.env.VITE_CF_BUCKET_PATH;
const noImage = import.meta.env.VITE_CG_NO_IMAGE;

interface LogosProps {
  logo_id?: number;
  logo: string;
  start_year: number | null;
  end_year: number | null;
  index: number;
  onUpdate: (
    index: number,
    updatedData: {
      logo?: string;
      start_year?: number;
      end_year?: number;
    }
  ) => void;
}

const Logos = ({
  logo_id,
  logo,
  start_year,
  end_year,
  index,
  onUpdate,
}: LogosProps) => {
  const [loadingLogo, setLoadingLogo] = useState(false);
  const [tmpLogoPath, setTmpLogoPath] = useState(logo || '');
  const { enqueueSnackbar } = useSnackbar();

  const handleLogoUpload = async (filePath: string) => {
    const url = `${bucketPath}${filePath}`;
    setLoadingLogo(true);
    try {
      await waitForImageAvailable(url);
      setTmpLogoPath(filePath);
      onUpdate(index, { logo: url });
    } catch (e) {
      enqueueSnackbar('Failed to load image from storage.', {
        variant: 'error',
      });
    } finally {
      setLoadingLogo(false);
    }
  };

  const handleStartYearChange = (value: number) => {
    onUpdate(index, { start_year: value });
  };

  const handleEndYearChange = (value: number) => {
    onUpdate(index, { end_year: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }} sx={{ justifyItems: 'center' }}>
        {loadingLogo ? (
          <CircularProgress />
        ) : (
          <Box
            component='img'
            src={
              logo_id
                ? logo
                : tmpLogoPath
                ? `${bucketPath}${tmpLogoPath}`
                : noImage
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
          value={tmpLogoPath}
        />
        <SbUploadFile onFileUpload={handleLogoUpload} />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <SelectNumber
          value={start_year}
          label='Start Year *'
          id='start_year'
          name='start_year'
          min={1980}
          max={new Date().getFullYear()}
          onChange={handleStartYearChange}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <SelectNumber
          value={end_year}
          label='End Year'
          id='end_year'
          name='end_year'
          min={1980}
          max={new Date().getFullYear()}
          onChange={handleEndYearChange}
        />
      </Grid>
    </Grid>
  );
};

export default Logos;
