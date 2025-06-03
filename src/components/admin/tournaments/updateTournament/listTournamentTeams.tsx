import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getTeamsByTournament } from '../../../../api/teams-tournaments/queries';

const ListTournamentTeams = ({ tournamentId, handleToggle, checked }: any) => {
  const {
    data: teams,
    isLoading,
    isError,
  } = getTeamsByTournament(tournamentId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!teams) return <h3>No data available</h3>;

  return (
    <>
      <Paper
        elevation={4}
        sx={{ width: '100%', height: 470, overflow: 'auto' }}
      >
        <List>
          {teams.map((team: any) => (
            <ListItem
              key={team.id}
              role='listitem'
              onClick={handleToggle(team.id)}
            >
              <Checkbox
                checked={checked.indexOf(team.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  'aria-labelledby': team.id?.toString(),
                }}
              />
              <ListItemText id={team.id?.toString()} primary={team.full_name} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box ml={2} mt={1}>
        <Typography sx={{ fontWeight: 500 }} variant='body1'>
          Teams: {teams.length}
        </Typography>
      </Box>
    </>
  );
};

export default ListTournamentTeams;
