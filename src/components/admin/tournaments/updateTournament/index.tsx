import { useSnackbar } from 'notistack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header';
import ListAllTeams from './listAllTeams';
import ListTournamentTeams from './listTournamentTeams';
import Stack from '@mui/material/Stack';
import GreenButton from '../../../common/Buttons/greenButton';
import AppButton from '../../../common/Buttons/appButton';
import {
  useAddTeamTournament,
  useDeleteTeamTournament,
} from '../../../../api/teams-tournaments/mutations';
import { getTournament } from '../../../../api/tournaments/queries';

const Tournament = () => {
  const [checked, setChecked] = useState<readonly number[]>([]);
  const params = useParams();
  const tournamentId: number = Number(params.id);
  const { enqueueSnackbar } = useSnackbar();

  const { data: tournament, isLoading, isError } = getTournament(tournamentId);

  const { mutateAsync: addTeamTournament } = useAddTeamTournament(tournamentId);
  const { mutate: deleteTeamTournament } =
    useDeleteTeamTournament(tournamentId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!tournament) return <h3>No data available</h3>;

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleCheckedRemove = (id: number) => {
    deleteTeamTournament({ id });
    setChecked([]);
  };

  const handleCheckedAdd = (id: number) => {
    try {
      addTeamTournament(
        {
          tournament_id: tournamentId,
          team_id: id,
        },
        {
          onSuccess: () => {
            setChecked([]);
          },
        }
      );
    } catch (e) {
      enqueueSnackbar('Failed to save tournament.', { variant: 'error' });
    }
  };

  return (
    <Container>
      <Header tournament={tournament} />
      <Grid container alignItems='center' mt={-3}>
        <Grid size={{ xs: 5 }}>
          <ListAllTeams handleToggle={handleToggle} checked={checked} />
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={1}
          >
            <GreenButton text='>>' size='small' iconIndex={0} />
            <GreenButton
              text='>'
              size='small'
              onClick={() => {
                handleCheckedAdd(Number(checked[0]));
              }}
              iconIndex={0}
            />
            <AppButton
              text='<'
              size='small'
              color='error'
              onClick={() => {
                handleCheckedRemove(Number(checked[0]));
              }}
            />
            <AppButton text='<<' size='small' to=''/>
          </Stack>
        </Grid>
        <Grid size={{ xs: 5 }} mt={9}>
          <ListTournamentTeams
            tournamentId={tournamentId}
            handleToggle={handleToggle}
            checked={checked}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tournament;
