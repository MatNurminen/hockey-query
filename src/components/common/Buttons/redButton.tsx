import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type RedButtonProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  hidden?: boolean;
};

const RedButton = ({ text, size, hidden, onClick }: RedButtonProps) => {
  const props: any = {
    size,
    variant: 'contained',
    color: 'error',
    sx: { textTransform: 'uppercase' },
    onClick: onClick,
    hidden,
  };

  return (
    <Button {...props} startIcon={<DeleteForeverIcon />}>
      {text}
    </Button>
  );
};

export default RedButton;
