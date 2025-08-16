import Button, { ButtonProps } from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type RedButtonProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  hidden?: boolean;
  disabled?: boolean;
};

const RedButton = ({
  text,
  size,
  hidden,
  onClick,
  disabled = false,
}: RedButtonProps) => {
  const props: ButtonProps = {
    size,
    variant: 'contained',
    color: 'error',
    sx: { textTransform: 'uppercase' },
    onClick: onClick,
    hidden,
    disabled,
  };

  return (
    <Button {...props} startIcon={<DeleteForeverIcon />}>
      {text}
    </Button>
  );
};

export default RedButton;
