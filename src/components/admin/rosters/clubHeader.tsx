import { memo, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import SectionFirst from '../../common/Sections/sectionFirst';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import GreenButton from '../../common/Buttons/greenButton';
import SearchPlayer from '../../common/SearchPlayer';
import { useAddPlayerTournament } from '../../../api/players-tournaments/mutations';
import { useSnackbar } from 'notistack';
import GrayButton from '../../common/Buttons/grayButton';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '70px',
  maxHeight: '70px',
});

const AddPlayerDialog = ({
  teamTournamentId,
  leagueId,
  seasonId,
}: {
  teamTournamentId: number;
  leagueId: number;
  seasonId: number;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { mutateAsync: addPlayerTournament } = useAddPlayerTournament(
    leagueId,
    seasonId
  );
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addPlayer = async (playerId: number) => {
    try {
      setOpen(false);
      await addPlayerTournament({
        teams_tournament_id: teamTournamentId,
        player_id: playerId,
      });
    } catch (error) {
      enqueueSnackbar('Failed to add player.', { variant: 'error' });
    }
  };

  return (
    <>
      <GreenButton
        size='small'
        text='Add Player'
        onClick={handleOpen}
        iconIndex={0}
      />
      <Dialog maxWidth='sm' fullWidth={true} open={open} onClose={handleClose}>
        <DialogContent>
          <SearchPlayer onPlayerSelect={addPlayer} />
        </DialogContent>
        <DialogActions sx={{ mr: 3, mb: 3, p: 0 }}>
          <GrayButton size='small' text='Cancel' onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </>
  );
};

const ClubHeader = ({
  teamTournamentId,
  leagueId,
  seasonId,
  team,
  logo,
}: {
  teamTournamentId: number;
  leagueId: number;
  seasonId: number;
  team: string;
  logo: string;
}) => {
  return (
    <Box sx={{ mt: 4, mb: 1 }}>
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
      >
        <Grid size={2}>
          <Img alt='' src={logo} />
        </Grid>
        <Grid size={8}>
          <SectionFirst content={team} txtAlign='left' />
        </Grid>
        <Grid size={2}>
          <AddPlayerDialog
            teamTournamentId={teamTournamentId}
            leagueId={leagueId}
            seasonId={seasonId}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(ClubHeader);
