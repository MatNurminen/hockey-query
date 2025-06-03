import Box from '@mui/material/Box';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';
import GreenButton from '../../common/Buttons/greenButton';
import TableFlag from '../../common/Images/tableFlag';
import { getPlayersStatsDetail } from '../../../api/players-stats/queries';

const PlayersStatsPerSeason = ({ teamId, title }: any) => {
  const {
    data: players,
    isLoading,
    isError,
  } = getPlayersStatsDetail({
    teamId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!players) return <div>No data available</div>;

  const defenders = (players: any) => {
    return players
      .filter((f: any) => f.player_order === 2)
      .sort((b: any, a: any) => a.goals - b.goals)
      .slice(0, 5);
  };

  const forwards = (players: any) => {
    return players
      .filter((f: any) => f.player_order === 3)
      .sort((b: any, a: any) => a.goals - b.goals)
      .slice(0, 5);
  };

  const items: { sort: number; list: any; name: string }[] = [
    { sort: 3, list: forwards, name: 'forwards' },
    { sort: 2, list: defenders, name: 'defensemen' },
  ];

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='stretch'
      spacing={2}
    >
      {items.map((item: any) => (
        <Grid size={{ sm: 12, md: 6 }} key={item.name}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <HeaderMain
                cells={[`${title} all-time ${item.name} goals per season`]}
              />
            </Table>
            <Table size='small'>
              <HeaderSection
                cells={[
                  { align: 'center', text: '#' },
                  { text: 'Player' },
                  { text: 'Season' },
                  { text: 'League' },
                  { align: 'center', text: 'gp' },
                  { align: 'center', text: 'g' },
                ]}
              />
              <TableBody>
                {item.list(players).map((player: any, key: any) => (
                  <TableRow key={key}>
                    <TableCell align='center'>{key + 1}</TableCell>
                    <TableCell>
                      <Box display='flex' alignItems='center'>
                        <TableFlag src={player.player_flag} />
                        <Link
                          underline='hover'
                          component={RouterLink}
                          to={`/players/${player.player_id}`}
                          ml={1}
                        >
                          {player.first_name} {player.last_name} (
                          {player.player_position})
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell align='center'>{player.name}</TableCell>
                    <TableCell>{player.short_name}</TableCell>
                    <TableCell align='center'>{player.games}</TableCell>
                    <TableCell align='center'>{player.goals}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={1}>
            <GreenButton fullWidth={true} text='Show More' />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlayersStatsPerSeason;
