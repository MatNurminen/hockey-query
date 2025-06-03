import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

const GrayButton = ({
  text,
  size,
  fullWidth,
  onClick,
  disabled = false,
}: any) => {
  return (
    <Button
      fullWidth={fullWidth}
      size={size}
      variant='contained'
      color='inherit'
      sx={{
        textTransform: 'uppercase',
      }}
      onClick={onClick}
      startIcon={<CancelIcon />}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

export default GrayButton;
