import Button, { type ButtonProps } from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { type ReactNode, memo } from 'react';

type AppButtonPropsBase = {
  text: string;
  color?: ButtonProps['color'];
  iconName?:
    | 'add'
    | 'edit'
    | 'save'
    | 'photo'
    | 'search'
    | 'check'
    | 'cancel'
    | 'delete';
  startIcon?: ReactNode;
  sx?: ButtonProps['sx'];
} & Omit<ButtonProps, 'startIcon' | 'sx' | 'onClick'>;

type AppButtonProps = AppButtonPropsBase &
  (
    | { to: string; href?: never; onClick?: never }
    | { href: string; to?: never; onClick?: never }
    | { onClick: ButtonProps['onClick']; to?: never; href?: never }
  );

const predefinedIcons: Record<string, ReactNode> = {
  add: <AddIcon />,
  edit: <EditIcon />,
  save: <SaveAltIcon />,
  photo: <AddPhotoAlternateIcon />,
  search: <SearchIcon />,
  check: <CheckIcon />,
  cancel: <CancelIcon />,
  delete: <DeleteForeverIcon />,
};

const AppButton = memo(
  ({
    text,
    color = 'primary',
    size = 'medium',
    fullWidth = false,
    onClick,
    iconName,
    startIcon: customStartIcon,
    disabled = false,
    to,
    href,
    sx,
    ...other
  }: AppButtonProps) => {
    const resolvedStartIcon = customStartIcon ?? (iconName ? predefinedIcons[iconName] : undefined);

    const baseProps: ButtonProps = {
      color,
      fullWidth,
      size,
      variant: 'contained',
      sx: { textTransform: 'uppercase', ...sx },
      startIcon: resolvedStartIcon,
      disabled,
      children: text,
      ...other,
    };

    return to ? (
      <Button component={RouterLink} to={to} {...baseProps} />
    ) : href ? (
      <Button
        component='a'
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        {...baseProps}
      />
    ) : (
      <Button onClick={onClick} {...baseProps} />
    );
  }
);

AppButton.displayName = 'AppButton';

export default AppButton;
