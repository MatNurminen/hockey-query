import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';

type GrayButtonProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const GrayButton = ({
  text,
  size,
  fullWidth,
  onClick,
  disabled = false,
}: GrayButtonProps) => {
  const props: any = {
    fullWidth,
    size,
    variant: 'contained',
    color: 'inherit',
    sx: { textTransform: 'uppercase' },
    disabled,
    onClick: onClick,
  };
  return (
    <Button {...props} startIcon={<CancelIcon />}>
      {text}
    </Button>
  );
};

export default GrayButton;
