import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './header';
import ListAllTeams from './listAllTeams';
import ListTournamentTeams from './listTournamentTeams';
import Stack from '@mui/material/Stack';
import GreenButton from '../../../common/Buttons/greenButton';
import RedButton from '../../../common/Buttons/redButton';
import { getTeamsByTournament } from '../../../../api/teams-tournaments/queries';
import { useDeleteTeamTournment } from '../../../../api/teams-tournaments/mutations';

const Tournament = () => {
  const [checked, setChecked] = useState<readonly number[]>([]);
  const params = useParams();
  const tournamentId: number = Number(params.id);

  const {
    data: teams,
    isLoading,
    isError,
  } = getTeamsByTournament(tournamentId);

  const { mutate: deleteTeamTournament } = useDeleteTeamTournment(tournamentId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!teams) return <h3>No data available</h3>;

  //console.log('teams', teams[0]);

  const tournament = teams[0];

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

  const handleCheckedRight = (id: number) => {
    deleteTeamTournament({ id });
    console.log('id', id);

    setChecked([]);
  };

  const handleCheckedLeft = () => {
    // createTeamTournament();
    setChecked([]);
  };

  return (
    <Container sx={{ py: 1 }}>
      <Header tournament={tournament} />
      <Grid container alignItems='center' spacing={2}>
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
            <GreenButton sx={{ m: 4 }} text='>>' size='small' iconIndex={0} />
            <GreenButton
              text='>'
              size='small'
              onClick={handleCheckedLeft}
              iconIndex={0}
            />
            <RedButton
              text='<'
              size='small'
              onClick={() => {
                handleCheckedRight(Number(checked[0]));
              }}
            />
            <RedButton text='<<' size='small' />
          </Stack>
        </Grid>
        <Grid size={{ xs: 5 }}>
          <ListTournamentTeams
            handleToggle={handleToggle}
            checked={checked}
            teams={teams ?? []}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tournament;
