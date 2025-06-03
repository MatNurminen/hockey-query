import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import TableFlag from '../../common/Images/tableFlag';
import { getPlayers } from '../../../api/players/queries';
import { useDebounce } from 'use-debounce';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchBar = () => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(null);
  const [debouncedInput] = useDebounce(inputValue, 400);
  const navigate = useNavigate();

  const enabled = debouncedInput.length > 2;

  const { data: players = [], isFetching } = getPlayers(
    debouncedInput,
    enabled
  );

  const handleSearch = () => {
    // ???
  };

  return (
    <AppBar elevation={0} sx={{ backgroundColor: '#eaecf2' }} position='static'>
      <Container sx={{ my: 2 }}>
        <Stack direction='row' justifyContent='center'>
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
                : `${option.first_name ?? ''} ${option.last_name ?? ''} ${
                    option.id ?? ''
                  }`
            }
            onChange={(_, newValue) => {
              if (newValue && typeof newValue !== 'string') {
                setInputValue('');
                setValue(null);
                navigate(`/players/${newValue.id}`);
              }
            }}
            renderOption={(props, option) => {
              if (!option.nation?.flag) return null;

              return (
                <Box
                  component='li'
                  {...props}
                  key={option.id}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Box display='flex' sx={{ mr: 1 }}>
                    <TableFlag src={option.nation.flag} />
                  </Box>
                  {option.first_name} {option.last_name} ({option.birth_year}) (
                  {option.player_position})
                </Box>
              );
            }}
            sx={{ width: '80%', backgroundColor: '#fff' }}
            open={
              debouncedInput.length > 2 &&
              !isFetching &&
              players.every((p) => p.nation?.flag)
            }
            renderInput={(params) => (
              <TextField {...params} label='Search players' size='small' />
            )}
          />
          <Button
            variant='contained'
            color='success'
            size='small'
            onClick={handleSearch}
            //disabled={inputValue.length <= 2}
          >
            <SearchIcon />
          </Button>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default SearchBar;
