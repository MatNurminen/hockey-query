import Button, { ButtonProps } from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

type GrayButtonProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
};

const GrayButton = ({
  text,
  size,
  fullWidth,
  onClick,
  disabled = false,
  autoFocus = false,
}: GrayButtonProps) => {
  const props: ButtonProps = {
    fullWidth,
    size,
    variant: 'contained',
    color: 'inherit',
    sx: { textTransform: 'uppercase' },
    disabled,
    onClick: onClick,
    autoFocus,
  };
  return (
    <Button {...props} startIcon={<CancelIcon />}>
      {text}
    </Button>
  );
};

export default GrayButton;
