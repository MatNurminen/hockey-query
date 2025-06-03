import { memo } from 'react';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSearchParams } from 'react-router-dom';
import { getSeasons } from '../../../../api/seasons/queries';

export interface SelectSeasonProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectSeason = ({ value, onChange }: SelectSeasonProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = getSeasons();

  const seasonFromUrl = searchParams.get('season') || '';
  const currentValue = value ?? seasonFromUrl;

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue); // controlled mode
    } else {
      searchParams.set('season', newValue); // uncontrolled mode
      setSearchParams(searchParams);
    }
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (isError || !data) return <h3>Error loading seasons</h3>;

  return (
    <Stack direction='row' spacing={2}>
      <FormControl fullWidth size='small'>
        <Select
          labelId='season-label'
          id='season-select'
          value={currentValue || ''}
          onChange={handleChange}
        >
          {data.map((season: any) => (
            <MenuItem key={season.id} value={String(season.id)}>
              {season.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default memo(SelectSeason);
