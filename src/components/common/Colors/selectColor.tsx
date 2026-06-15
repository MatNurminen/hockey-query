import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChromePicker, ColorResult } from "react-color";
import GreenButton from "../Buttons/greenButton";
import GrayButton from "../Buttons/grayButton";

export interface SelectColorProps {
  open: boolean;
  onClose: () => void;
  onColorChange: (color: string) => void;
  onCancel?: () => void;
  initialColor?: string;
  title?: string;
  showAlpha?: boolean;
}

const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

const normalizeColor = (color: string): string => {
  if (!isValidHexColor(color)) {
    return "#ffffff";
  }
  return color;
};

const SelectColor = ({
  open,
  onClose,
  onColorChange,
  onCancel,
  initialColor = "#ffffff",
  title = "Select color",
  showAlpha = false,
}: SelectColorProps) => {
  const [color, setColor] = useState(normalizeColor(initialColor));

  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setColor(normalizeColor(initialColor));
    }
    prevOpenRef.current = open;
  }, [open, initialColor]);

  const handleColorChange = useCallback((colorResult: ColorResult) => {
    setColor(colorResult.hex);
  }, []);

  const handleSelect = useCallback(() => {
    onColorChange(color);
    onClose();
  }, [color, onColorChange, onClose]);

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    onClose();
  }, [onCancel, onClose]);

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="color-picker-dialog-title"
      maxWidth="sm"
    >
      <DialogTitle id="color-picker-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <ChromePicker
          color={color}
          onChange={handleColorChange}
          disableAlpha={!showAlpha}
        />
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 2 }}>
        <GreenButton
          text="Select"
          size="small"
          iconIndex={5}
          onClick={handleSelect}
        />
        <GrayButton text="Cancel" size="small" onClick={handleCancel} />
      </DialogActions>
    </Dialog>
  );
};

export default SelectColor;
