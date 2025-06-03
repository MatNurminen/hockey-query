import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchIcon from '@mui/icons-material/Search';

type GreenButtonProps = {
  text: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  onClick?: () => void;
  iconIndex?: number;
  disabled?: boolean;
  to?: string;
  href?: string;
};

const icons = [
  <AddIcon key='add' />,
  <EditIcon key='edit' />,
  <SaveAltIcon key='save' />,
  <AddPhotoAlternateIcon key='photo' />,
  <SearchIcon key='search' />,
];

const GreenButton = ({
  text,
  size = 'medium',
  fullWidth = false,
  onClick,
  iconIndex,
  disabled = false,
  to,
  href,
}: GreenButtonProps) => {
  const icon = iconIndex !== undefined ? icons[iconIndex] : undefined;

  const props: any = {
    fullWidth,
    size,
    variant: 'contained',
    color: 'success',
    sx: { textTransform: 'uppercase' },
    startIcon: icon,
    disabled,
  };

  if (to) {
    props.component = RouterLink;
    props.to = to;
  } else if (href) {
    props.component = 'a';
    props.href = href;
    props.target = '_blank';
    props.rel = 'noopener noreferrer';
  } else {
    props.onClick = onClick;
  }

  return <Button {...props}>{text}</Button>;
};

export default GreenButton;
