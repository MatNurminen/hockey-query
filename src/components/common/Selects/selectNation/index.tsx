import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TableFlag from '../../Images/tableFlag';
import FormHelperText from '@mui/material/FormHelperText';
import { getNations } from '../../../../api/nations/queries';

export interface SelectProps {
  id?: string;
  name?: string;
  label?: string;
  defaultValue?: string;
  setFormInput?: ({}) => void;
  onChange?: (value: number) => void;
  onBlur?: any;
  errorId?: any;
  helperText?: any;
  value?: number;
}

const SelectNation = (props: SelectProps) => {
  const [searchParams] = useSearchParams();
  const nationId = String(searchParams.get('nation'));
  const [nation, setNation] = useState(nationId);
  const [nationParam, setNationParam] = useSearchParams();
  const { id, name, setFormInput, label, errorId, helperText, value } = props;

  const defaultLabel = label || 'Nation';

  const { data, isLoading, isError } = getNations();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  const handleChange = (event: SelectChangeEvent) => {
    const stringValue = event.target.value;
    setNation(stringValue);
    const numericValue = Number(stringValue);

    if (setFormInput) {
      setFormInput({ nation_id: numericValue });
    } else {
      nationParam.set('nation', stringValue);
      setNationParam(nationParam);
    }

    if (props.onChange) {
      props.onChange(numericValue);
    }
  };

  return (
    <FormControl fullWidth size='small' error={errorId}>
      <InputLabel id='select-label'>{defaultLabel}</InputLabel>
      <Select
        labelId='nation-label'
        id={id}
        name={name}
        value={value !== undefined ? String(value) : nation}
        label={defaultLabel}
        onChange={handleChange}
      >
        {data.map((nation: any, key: any) => (
          <MenuItem key={key} value={String(nation.id)}>
            <Box display='flex' alignItems='center'>
              <Box display='flex' sx={{ mr: 1 }}>
                <TableFlag src={nation.flag} />
              </Box>
              {nation.name}
            </Box>
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectNation;
