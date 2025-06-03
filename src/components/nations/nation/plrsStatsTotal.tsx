import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import TableFlag from '../../common/Images/tableFlag';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import GreenButton from '../../common/Buttons/greenButton';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import { useMultiplePlayersStatsTotal } from '../../../api/players-stats/hooks';

const PlrsStatsTotal = ({ nationId }: any) => {
  const configs = [
    {
      id: 1,
      name: 'NHL All-Time Points',
      params: {
        nationId,
        leagueId: 14,
        playerOrd: [2, 3],
        limit: 10,
      },
    },
    {
      id: 2,
      name: 'World Championships All-Time Points',
      params: {
        nationId,
        leagueId: 23,
        playerOrd: [2, 3],
        limit: 10,
      },
    },
  ];

  const {
    data: items,
    isLoading,
    isError,
  } = useMultiplePlayersStatsTotal(configs);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <h3>Error!</h3>;

  return (
    <Container>
      <Grid container spacing={3}>
        {items.map((item: any) => (
          <Grid key={item.id} size={{ xs: 12, md: 6 }}>
            <TableContainer component={Paper}>
              <Table size='small'>
                <HeaderMain cells={[item.name]} />
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
                    <TableRow key={player.player_id}>
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
                      <TableCell align='center'>{player.games_t}</TableCell>
                      <TableCell align='center'>{player.goals_t}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={1}>
              <GreenButton fullWidth={true} text='SHOW MORE' />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PlrsStatsTotal;
