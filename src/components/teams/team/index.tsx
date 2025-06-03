import Container from '@mui/material/Container';
import { useSearchParams, useParams } from 'react-router-dom';
import Header from './header';
import SectionExternalLinks from '../../common/Sections/sectionExternalLinks';
import SelectSeason from '../../common/Selects/selectSeason';
import Roster from './roster';
import Nats from './nats';
import History from './history';
import Paper from '@mui/material/Paper';
import { getTeam } from '../../../api/teams/queries';
import PlayersStatsTotal from './playersStatsTotal';
import PlayersStatsPerSeason from './playersStatsPerSeason';
import NatsTotal from './natsTotal';

const Team = () => {
  const params = useParams();
  const teamId = Number(params.id);

  const [searchParams] = useSearchParams();
  const seasonId: string = searchParams.get('season') || '2012';

  const { data: team, isError, isLoading } = getTeam(teamId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!team) return <h3>No data available</h3>;

  const title: string = team.full_name;

  return (
    <Container sx={{ py: 1, mt: 2, mb: 10 }}>
      <Paper sx={{ px: 2, pb: 1 }}>
        <Header team={team} />
      </Paper>
      <Paper sx={{ mt: 2, py: 1 }}>
        <SectionExternalLinks title={title} />
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <SelectSeason />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Roster teamId={teamId} seasonId={seasonId} title={title} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Nats teamId={teamId} seasonId={seasonId} title={title} />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <History title={title} teamId={teamId} />
      </Paper>
      <Paper sx={{ mt: 4, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <PlayersStatsTotal teamId={teamId} title={title} />
      </Paper>
      <Paper sx={{ mt: 2, backgroundColor: 'transparent', boxShadow: 'none' }}>
        <PlayersStatsPerSeason teamId={teamId} title={title} />
      </Paper>
      <Paper>
        <NatsTotal teamId={teamId} />
      </Paper>
      {/* <PlayersStatsAllTime teamId={params.id} />
      <Divider sx={{ my: 3 }} />
      <PlayersStatsSeasons teamId={params.id} />
      <Divider sx={{ my: 3 }} />
      <Nations teamId={params.id} /> */}
    </Container>
  );
};

export default Team;
