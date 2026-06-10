import Button, { ButtonProps } from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PaletteIcon from '@mui/icons-material/Palette';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

type BlueButtonProps = {
  text: string;
  iconIndex?: number;
  children?: React.ReactNode;
} & ButtonProps;

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
  ...rest
}: BlueButtonProps) => {
  const icon = iconIndex !== undefined ? icons[iconIndex] : undefined;

  return (
    <Button
      fullWidth={fullWidth}
      size={size}
      variant='contained'
      color='primary'
      sx={{ textTransform: 'uppercase' }}
      startIcon={icon}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {text} {children}
    </Button>
  );
};

export default BlueButton;
