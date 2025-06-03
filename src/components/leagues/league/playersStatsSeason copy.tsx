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
import { useMultiplePlayersStatsDetail } from '../../../api/players-stats/hooks';

const PlayersStatsSeason = ({ leagueId, seasonId, title }: any) => {
  const configs = [
    {
      id: 1,
      name: 'forwards',
      params: {
        leagueId,
        seasonId,
        playerOrd: [3],
        limit: 5,
      },
    },
    {
      id: 2,
      name: 'defenders',
      params: {
        leagueId,
        seasonId,
        playerOrd: [2],
        limit: 5,
      },
    },
    {
      id: 3,
      name: 'goaltending',
      params: {
        leagueId,
        seasonId,
        playerOrd: [1],
        limit: 5,
      },
    },
  ];

  const {
    data: items,
    isLoading,
    isError,
  } = useMultiplePlayersStatsDetail(configs);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <h3>Error!</h3>;

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      spacing={2}
    >
      {items.map((item: any) => (
        <Grid size={{ sm: 12, md: 4 }} key={item.id}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <HeaderMain
                cells={[
                  `${seasonId}-${seasonId - 1999} ${title} ${item.name} Stats`,
                ]}
              />
            </Table>
            <Table size='small'>
              <HeaderSection
                cells={[
                  { align: 'center', text: '#' },
                  { text: 'Player' },
                  { align: 'center', text: 'gp' },
                  { align: 'center', text: 'g' },
                ]}
              />
              <TableBody>
                {item.list.map((player: any, key: any) => (
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

export default PlayersStatsSeason;
