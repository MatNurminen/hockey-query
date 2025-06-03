import { useState } from 'react';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import MainCard from './mainCard';
import Facts from './facts';
import Stats from './stats';
import { getPlayer } from '../../../api/players/queries';
import Grid from '@mui/material/Grid2';
import StatsTotal from './statsTotal';
import Highlights from './highlights';
import GreenButton from '../../common/Buttons/greenButton';
import UpdatePlayer from '../../admin/players/updatePlayer';

const Player = () => {
  const params = useParams();
  const playerId = Number(params.id);
  const [open, setOpen] = useState(false);
  const [lastTeam, setLastTeam] = useState(null);

  const { data: player, isError, isLoading } = getPlayer(playerId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!player) return <h3>No data available</h3>;

  const playerName = player.first_name + ' ' + player.last_name;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container sx={{ py: 1, mt: 2, mb: 10 }}>
        <Grid container spacing={2} direction='row'>
          <Grid size={{ sm: 12, md: 6 }}>
            <Paper sx={{ height: '100%' }}>
              <MainCard player={player} lastTeam={lastTeam} />
            </Paper>
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <Paper sx={{ height: '100%' }}>
              <Facts player={player} />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12 }} textAlign='right'>
            <GreenButton
              text='Edit Player'
              onClick={handleOpen}
              size='small'
              iconIndex={1}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Stats
              playerName={playerName}
              playerId={playerId}
              setLastTeam={setLastTeam}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <StatsTotal playerName={playerName} playerId={playerId} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Highlights playerName={playerName} playerId={playerId} />
          </Grid>
        </Grid>
      </Container>
      <UpdatePlayer playerId={playerId} open={open} onClose={handleClose} />
    </>
  );
};

export default Player;
