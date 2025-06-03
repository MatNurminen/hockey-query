import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const SelectNumber = ({
  value,
  label,
  id,
  min,
  max,
  nullable,
  error,
  helperText,
  onChange,
}: any) => {
  const [internalValue, setInternalValue] = useState(value || '');

  useEffect(() => {
    setInternalValue(value || '');
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    onChange(newValue);
  };

  const items = [];
  for (let i: number = min; i <= max; i++) {
    items.push(
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    );
  }

  return (
    <FormControl fullWidth size='small' error={error}>
      <InputLabel id='select-label'>{label}</InputLabel>
      <Select
        labelId='label'
        id={id}
        value={internalValue}
        label={label}
        onChange={handleChange}
      >
        {nullable && (
          <MenuItem key={0} value='NONE'>
            NONE
          </MenuItem>
        )}
        {items}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectNumber;
