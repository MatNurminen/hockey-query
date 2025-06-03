import Container from '@mui/material/Container';
import Header from './header';
import TournamentsByLeague from './tournaments';
import { useSearchParams } from 'react-router-dom';

const Tournaments = () => {
  const [searchParams] = useSearchParams();
  const leagueId = searchParams.get('league') || '';

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <Header leagueId={leagueId} />
      <TournamentsByLeague leagueId={leagueId} />
    </Container>
  );
};

export default Tournaments;
