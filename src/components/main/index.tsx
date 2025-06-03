import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Cards from './Cards';
import Leagues from './Leagues';

const Main = () => {
  const [curSeason, setCurSeason] = useState(0);

  return (
    <Container sx={{ pt: 4, background: '#fff' }}>
      <Grid container spacing={4}>
        <Grid size={8}>
          <Cards setCurSeason={setCurSeason} />
        </Grid>
        <Grid size={4}>
          <Leagues curSeason={curSeason} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
