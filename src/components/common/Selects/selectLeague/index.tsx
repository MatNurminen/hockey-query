import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSearchParams } from 'react-router-dom';
import { getLeaguesCurLogo } from '../../../../api/leagues/queries';

export interface SelectLeagueProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectLeague = ({ value, onChange }: SelectLeagueProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: leagues, isLoading, isError } = getLeaguesCurLogo();

  const seasonFromUrl = searchParams.get('league') || '';
  const currentValue = value ?? seasonFromUrl;

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      searchParams.set('league', newValue);
      setSearchParams(searchParams);
    }
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!leagues) return <h3>No data available</h3>;

  return (
    <FormControl fullWidth size='small'>
      <InputLabel id='select-label'>League</InputLabel>
      <Select
        labelId='league-label'
        id='league-select'
        value={currentValue || ''}
        onChange={handleChange}
        label='League'
      >
        {leagues.map((league: any) => (
          <MenuItem key={league.id} value={league.id}>
            {league.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLeague;
