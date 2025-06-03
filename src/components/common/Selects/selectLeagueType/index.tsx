import { memo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getLeagueTypes } from '../../../../api/league-types/queries';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';

export interface SelectLeagueTypeProps {
  id?: string;
  name?: string;
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false;
}

const SelectLeagueType = (props: SelectLeagueTypeProps) => {
  const {
    id = 'league-type-select',
    name = 'type_id',
    label = 'League Type',
    value,
    onChange,
    onBlur,
    error,
    helperText,
  } = props;

  const { data, isLoading, isError } = getLeagueTypes();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  const handleChange = (event: SelectChangeEvent<number>) => {
    onChange?.(Number(event.target.value));
  };

  return (
    <FormControl fullWidth size='small' error={error}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        labelId={`${id}-label`}
        value={value ?? ''}
        label={label}
        onChange={handleChange}
        onBlur={onBlur}
      >
        {data.map((type) => (
          <MenuItem key={type.id} value={type.id}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default memo(SelectLeagueType);
