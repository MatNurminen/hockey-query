import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { useState, useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import GreenButton from '../Buttons/greenButton';

export interface SelectColorProps {
  open: boolean;
  onClose: () => void;
  onColorChange: (color: string) => void;
  initialColor?: string;
  title?: string;
  disableAlpha?: boolean;
}

const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

const normalizeColor = (color: string): string => {
  if (!isValidHexColor(color)) {
    return '#ffffff';
  }
  return color;
};

const SelectColor = ({
  open,
  onClose,
  onColorChange,
  initialColor = '#ffffff',
  title = 'Select color',
  disableAlpha = true,
}: SelectColorProps) => {
  const [color, setColor] = useState(normalizeColor(initialColor));

  useEffect(() => {
    setColor(normalizeColor(initialColor));
  }, [initialColor]);

  const handleColorChange = (colorResult: ColorResult) => {
    const newColor = colorResult.hex;
    setColor(newColor);
    onColorChange(newColor);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='color-picker-dialog-title'
      aria-describedby='color-picker-dialog-description'
      maxWidth='sm'
    >
      <DialogTitle id='color-picker-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <div id='color-picker-dialog-description'>
          <ChromePicker
            color={color}
            onChange={handleColorChange}
            disableAlpha={disableAlpha}
          />
        </div>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 2 }}>
        <GreenButton
          text='Select'
          size='small'
          iconIndex={5}
          onClick={handleClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default SelectColor;
