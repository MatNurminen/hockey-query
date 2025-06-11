import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useSearchParams } from 'react-router-dom';
import { getPlayersStatsDetail } from '../../api/players-stats/queries';
import { getNation } from '../../api/nations/queries';
import Header from './header';
import Stats from './stats';
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';

const NationStats = () => {
  const [searchParams] = useSearchParams();
  const nationId: any = searchParams.get('nation') || 1;
  const seasonId: any = searchParams.get('season') || 2012;

  const params = { nationId, seasonId };

  const {
    data: nation,
    isLoading: natLoading,
    isError: natError,
  } = getNation(nationId);
  const { data: players, isLoading, isError } = getPlayersStatsDetail(params);

  if (natLoading || isLoading) return <p>Loading...</p>;
  if (natError || isError) return <h3>Error!</h3>;
  if (!nation || !players) return <h3>No data available</h3>;

  return (
    <Container sx={{ py: 1, mt: 4, mb: 10 }}>
      <Grid container spacing={2} direction='row'>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ px: 2 }}>
            <Header nation={nation} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ mt: 2 }}>
            <Stats />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }} mt={2}>
          <Divider />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ mt: 2 }}>
            <Stats goalies={true} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NationStats;
