import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TableFlag from '../../common/Images/tableFlag';
import { getPlayers } from '../../../api/players/queries';
import { TPlayerDto } from '../../../api/players/types';

type Props = {
  onPlayerSelect: (playerId: number) => void;
};

const SearchPlayer = ({ onPlayerSelect }: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState<TPlayerDto | null>(null);
  const [debouncedInput] = useDebounce(inputValue, 400);
  const enabled = debouncedInput.length > 2;

  const { data: players = [], isFetching } = getPlayers(
    debouncedInput,
    enabled
  );

  return (
    <Autocomplete
      freeSolo
      id='player-search'
      options={players}
      loading={isFetching}
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      value={value}
      getOptionLabel={(option) =>
        typeof option === 'string'
          ? option
          : `${option.first_name ?? ''} ${option.last_name ?? ''}`
      }
      onChange={(_, newValue) => {
        if (newValue && typeof newValue !== 'string') {
          onPlayerSelect(newValue.id);
          setInputValue('');
          setValue(null);
        }
      }}
      renderOption={(props, option) => {
        return (
          <Box
            component='li'
            {...props}
            key={option.id}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Box display='flex' sx={{ mr: 1 }}>
              <TableFlag
                src={option.nation.flag}
                alt={`${option.first_name} ${option.last_name} flag`}
              />
            </Box>
            {option.first_name} {option.last_name} ({option.birth_year}) (
            {option.player_position})
          </Box>
        );
      }}
      sx={{ width: '100%', backgroundColor: '#fff' }}
      open={debouncedInput.length > 2 && !isFetching && players.length > 0}
      renderInput={(params) => (
        <TextField {...params} label='Search players' size='small' />
      )}
    />
  );
};

export default SearchPlayer;
