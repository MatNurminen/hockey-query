import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

export interface SelectColorProps {
  open: boolean;
  onClose: () => void;
  onColorChange: (color: string) => void;
}

const SelectColor = (props: SelectColorProps) => {
  const { onClose, open, onColorChange } = props;
  const [color, setColor] = useState('#ffffff');

  const handleColorChange = (color: ColorResult) => {
    setColor(color.hex);
    onColorChange(color.hex); // передаём выбранный цвет наверх
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <ChromePicker color={color} onChange={handleColorChange} />
      </DialogContent>
    </Dialog>
  );
};

export default SelectColor;
