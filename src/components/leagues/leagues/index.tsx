import Container from '@mui/material/Container';
import Header from './header';
import LeaguesTable from './leaguesTable';
import { getLeaguesCurLogo } from '../../../api/leagues/queries';

const Leagues = () => {
  const { data } = getLeaguesCurLogo();

  const currentSeason: number = 2024;

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <Header />
      {!data && <h3>No data available</h3>}
      <LeaguesTable leagues={data || []} seasonId={currentSeason} />
    </Container>
  );
};

export default Leagues;
