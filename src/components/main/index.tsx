import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Cards from './Cards';
import Leagues from './Leagues';
import { useLatestSeason } from '../../hooks/useLatestSeason';

const Main = () => {
  const latestSeason = useLatestSeason();

  return (
    <Container sx={{ pt: 4, background: '#fff' }}>
      <Grid container spacing={4}>
        <Grid size={8}>
          <Cards />
        </Grid>
        <Grid size={4}>
          <Leagues curSeason={latestSeason} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
