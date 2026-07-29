import Button, { type ButtonProps } from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveIcon from "@mui/icons-material/Remove";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { type ReactNode, memo } from "react";

type AppButtonPropsBase = {
  text: string;
  color?: ButtonProps["color"];
  iconName?:
    | "add"
    | "edit"
    | "save"
    | "photo"
    | "check"
    | "cancel"
    | "pdf"
    | "cloudUpload"
    | "delete"
    | "deleteForever"
    | "remove"
    | "reset";
  startIcon?: ReactNode;
  children?: ReactNode;
  sx?: ButtonProps["sx"];
} & Omit<ButtonProps, "startIcon" | "sx" | "onClick" | "children">;

type AppButtonProps = AppButtonPropsBase &
  (
    | { to: string; href?: never; onClick?: never }
    | { href: string; to?: never; onClick?: never }
    | { onClick: ButtonProps["onClick"]; to?: never; href?: never }
    | { to?: never; href?: never; onClick?: never }
  );

const predefinedIcons: Record<string, ReactNode> = {
  add: <AddIcon />,
  edit: <EditIcon />,
  save: <SaveIcon />,
  photo: <AddPhotoAlternateIcon />,
  check: <CheckIcon />,
  cancel: <CancelIcon />,
  pdf: <PictureAsPdfIcon />,
  cloudUpload: <CloudUploadIcon />,
  delete: <DeleteIcon />,
  deleteForever: <DeleteForeverIcon />,
  remove: <RemoveIcon />,
  reset: <RestartAltIcon />,
};

const AppButton = memo(
  ({
    text,
    color = "primary",
    size = "medium",
    fullWidth = false,
    onClick,
    iconName,
    startIcon: customStartIcon,
    disabled = false,
    to,
    href,
    sx,
    children,
    ...other
  }: AppButtonProps) => {
    const resolvedStartIcon =
      customStartIcon ?? (iconName ? predefinedIcons[iconName] : undefined);

    const baseProps: ButtonProps = {
      color,
      fullWidth,
      size,
      variant: "contained",
      sx: { textTransform: "uppercase", ...sx },
      startIcon: resolvedStartIcon,
      disabled,
      ...other,
    };

    return to ? (
      <Button component={RouterLink} to={to} {...baseProps}>
        {text}
        {children}
      </Button>
    ) : href ? (
      <Button
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...baseProps}
      >
        {text}
        {children}
      </Button>
    ) : (
      <Button onClick={onClick} {...baseProps}>
        {text}
        {children}
      </Button>
    );
  },
);

AppButton.displayName = "AppButton";

export default AppButton;
