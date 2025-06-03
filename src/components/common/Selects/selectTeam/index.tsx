import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import TableFlag from '../../Images/tableFlag';
import FormHelperText from '@mui/material/FormHelperText';
import { getTeamsByLeague } from '../../../../api/teams/queries';

export interface SelectProps {
  leagueId: number;
  id?: string;
  name?: string;
  label?: string;
  onChange?: (value: number | null) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false;
  value?: number | null;
}

const SelectTeam = (props: SelectProps) => {
  const {
    leagueId,
    id = 'team-select',
    name = 'team',
    label = 'Team',
    onChange,
    onBlur,
    error,
    helperText,
    value,
  } = props;

  const { data: teams, isLoading, isError } = getTeamsByLeague(leagueId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!teams) return <h3>No data available</h3>;

  const handleChange = (event: SelectChangeEvent<number | null>) => {
    const val = event.target.value === '' ? null : Number(event.target.value);
    onChange?.(val);
  };

  return (
    <FormControl fullWidth size='small' error={error}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={value ?? ''}
        label={label}
        onChange={handleChange}
        onBlur={onBlur}
      >
        <MenuItem value=''>
          <em>NONE</em>
        </MenuItem>
        {teams.map((team: any) => (
          <MenuItem key={team.id} value={team.id}>
            <Box display='flex' alignItems='center'>
              <Box display='flex' sx={{ mr: 1 }}>
                <TableFlag src={team.logo} />
              </Box>
              {team.full_name}
            </Box>
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectTeam;
