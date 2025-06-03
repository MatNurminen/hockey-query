import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchPlayer from '../../common/SearchPlayer';

const SearchBar = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    // ???
  };

  return (
    <AppBar elevation={0} sx={{ backgroundColor: '#eaecf2' }} position='static'>
      <Container sx={{ my: 2 }}>
        <Stack direction='row' justifyContent='center'>
          <SearchPlayer onPlayerSelect={(id) => navigate(`/players/${id}`)} />
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
