import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { useState, useEffect } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import GreenButton from '../Buttons/greenButton';
import GrayButton from '../Buttons/grayButton';

export interface SelectColorProps {
  open: boolean;
  onClose: () => void;
  onColorChange: (color: string) => void;
  onCancel?: () => void;
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
  onCancel,
  initialColor = '#ffffff',
  title = 'Select color',
  disableAlpha = true,
}: SelectColorProps) => {
  const [color, setColor] = useState(normalizeColor(initialColor));

  useEffect(() => {
    setColor(normalizeColor(initialColor));
  }, [initialColor, open]);

  // Только обновляем внутреннее состояние, не вызываем onColorChange
  const handleColorChange = (colorResult: ColorResult) => {
    setColor(colorResult.hex);
  };

  // Подтверждение выбора цвета
  const handleSelect = () => {
    onColorChange(color);
    onClose();
  };

  // Отмена выбора цвета
  const handleCancel = () => {
    if (onCancel) onCancel();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
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
          onClick={handleSelect}
        />
        <GrayButton text='Cancel' size='small' onClick={handleCancel} />
      </DialogActions>
    </Dialog>
  );
};

export default SelectColor;
