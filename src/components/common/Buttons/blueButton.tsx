import Button from '@mui/material/Button';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PaletteIcon from '@mui/icons-material/Palette';

const icons: JSX.Element[] = [
  <CreateNewFolderIcon />,
  <CloudUploadIcon />,
  <PaletteIcon />,
];

const BlueButton = ({
  text,
  size,
  disabled,
  fullWidth,
  onClick,
  iconIndex,
  children,
}: any) => {
  return (
    <Button
      fullWidth={fullWidth}
      size={size}
      variant='contained'
      sx={{ textTransform: 'uppercase' }}
      onClick={onClick}
      startIcon={icons[iconIndex]}
      component='label'
      disabled={disabled}
    >
      {text} {children}
    </Button>
  );
};

export default BlueButton;
