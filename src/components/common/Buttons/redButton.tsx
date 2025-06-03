import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const RedButton = ({ text, size, hidden, onClick }: any) => {
  return (
    <Button
      size={size}
      variant='contained'
      color='error'
      sx={{
        textTransform: 'uppercase',
        display: hidden ? 'none' : undefined,
      }}
      onClick={onClick}
      startIcon={<DeleteForeverIcon />}
    >
      {text}
    </Button>
  );
};

export default RedButton;
