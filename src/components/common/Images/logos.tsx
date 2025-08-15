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

const MIN_YEAR = 1980;
const MAX_YEAR = new Date().getFullYear();

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

/**
 * Валидация годов
 * @param startYear - начальный год
 * @param endYear - конечный год
 * @returns объект с ошибками валидации
 */
const validateYears = (startYear: number | null, endYear: number | null) => {
  const errors: { start_year?: string; end_year?: string } = {};

  if (startYear && (startYear < MIN_YEAR || startYear > MAX_YEAR)) {
    errors.start_year = `Year must be between ${MIN_YEAR} and ${MAX_YEAR}`;
  }

  if (endYear && (endYear < MIN_YEAR || endYear > MAX_YEAR)) {
    errors.end_year = `Year must be between ${MIN_YEAR} and ${MAX_YEAR}`;
  }

  if (startYear && endYear && startYear > endYear) {
    errors.end_year = 'End year must be after start year';
  }

  return errors;
};

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
  const [imageError, setImageError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleLogoUpload = async (filePath: string) => {
    const url = `${bucketPath}${filePath}`;
    setLoadingLogo(true);
    setImageError(false);

    try {
      await waitForImageAvailable(url);
      setTmpLogoPath(filePath);
      onUpdate(index, { logo: url });
      enqueueSnackbar('Logo uploaded successfully', { variant: 'success' });
    } catch (e) {
      setImageError(true);
      enqueueSnackbar('Failed to load image from storage.', {
        variant: 'error',
      });
    } finally {
      setLoadingLogo(false);
    }
  };

  const handleStartYearChange = (value: number) => {
    const errors = validateYears(value, end_year);
    if (errors.start_year) {
      enqueueSnackbar(errors.start_year, { variant: 'error' });
      return;
    }
    onUpdate(index, { start_year: value });
  };

  const handleEndYearChange = (value: number) => {
    const errors = validateYears(start_year, value);
    if (errors.end_year) {
      enqueueSnackbar(errors.end_year, { variant: 'error' });
      return;
    }
    onUpdate(index, { end_year: value });
  };

  const handleImageError = () => {
    setImageError(true);
    enqueueSnackbar('Image loading error', { variant: 'warning' });
  };

  const getImageSrc = () => {
    if (logo_id) return logo;
    if (tmpLogoPath) return `${bucketPath}${tmpLogoPath}`;
    return noImage;
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12 }} sx={{ justifyItems: 'center' }}>
        {loadingLogo ? (
          <CircularProgress />
        ) : (
          <Box
            component='img'
            src={getImageSrc()}
            alt={`League logo ${index + 1}`}
            sx={{
              height: '50px',
              objectFit: 'contain',
              opacity: imageError ? 0.5 : 1,
              border: imageError ? '1px solid #ff6b6b' : 'none',
              borderRadius: imageError ? '4px' : '0',
            }}
            onError={handleImageError}
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
          min={MIN_YEAR}
          max={MAX_YEAR}
          onChange={handleStartYearChange}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <SelectNumber
          value={end_year}
          label='End Year'
          id='end_year'
          name='end_year'
          min={MIN_YEAR}
          max={MAX_YEAR}
          onChange={handleEndYearChange}
        />
      </Grid>
    </Grid>
  );
};

export default Logos;
