import { useState } from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { getTeams } from '../../../../api/teams/queries';
import { useDebounce } from 'use-debounce';
import OutlinedInput from '@mui/material/OutlinedInput';

const ListAllTeams = ({ handleToggle, checked }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedValue] = useDebounce(inputValue, 400);

  const { data: teams, isLoading, isError } = getTeams(debouncedValue);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!teams) return <h3>No data available</h3>;

  return (
    <>
      <TextField
        label='Filter team'
        value={inputValue}
        size='small'
        fullWidth
        sx={{ backgroundColor: '#fff', mb: 1 }}
        onChange={(e) => setInputValue(e.target.value)}
        slots={{ input: OutlinedInput }}
        slotProps={{
          input: {
            endAdornment: inputValue && (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={() => setInputValue('')}
                  size='small'
                  sx={{ backgroundColor: 'transparent' }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Paper
        elevation={4}
        sx={{ width: '100%', height: 470, overflow: 'auto' }}
      >
        <List>
          {teams.map((team: any) => (
            <ListItem
              key={team.id}
              role='listitem'
              onClick={handleToggle(team.id)}
            >
              <Checkbox
                checked={checked.indexOf(team.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': team.id?.toString(),
                }}
              />
              <ListItemText id={team.id?.toString()} primary={team.full_name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  );
};

export default ListAllTeams;
