import Button, { ButtonProps } from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PaletteIcon from '@mui/icons-material/Palette';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

type BlueButtonProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  iconIndex?: number;
  disabled?: boolean;
  children?: React.ReactNode;
};

const icons = [
  <CreateNewFolderIcon />,
  <CloudUploadIcon />,
  <PaletteIcon />,
  <PictureAsPdfIcon />,
];

const BlueButton = ({
  text,
  size = 'medium',
  disabled = false,
  fullWidth = false,
  onClick,
  iconIndex,
  children,
}: BlueButtonProps) => {
  const icon = iconIndex !== undefined ? icons[iconIndex] : undefined;

  const props: ButtonProps = {
    fullWidth,
    size,
    variant: 'contained',
    color: 'primary',
    sx: { textTransform: 'uppercase' },
    startIcon: icon,
    disabled,
    onClick: onClick,
  };
  return (
    <Button {...props}>
      {text} {children}
    </Button>
  );
};

export default BlueButton;
