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
import TableFlag from '../../common/Images/tableFlag';
import { getPlayersStatsDetail } from '../../../api/players-stats/queries';

const PlayersFacts = ({ leagueId, seasonId }: any) => {
  const {
    data: players,
    isLoading,
    isError,
  } = getPlayersStatsDetail({
    leagueId,
    seasonId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!players) return <div>No data available</div>;

  const oldest = (players: any) => {
    return players
      .map((item: any) => ({
        ...item,
        age: seasonId - item.birth_year,
      }))
      .sort((b: any, a: any) => a.age - b.age)
      .slice(0, 5);
  };

  const youngest = (players: any) => {
    return players
      .map((item: any) => ({
        ...item,
        age: seasonId - item.birth_year,
      }))
      .sort((a: any, b: any) => a.age - b.age)
      .slice(0, 5);
  };

  const tallest = (players: any) => {
    return [...players]
      .sort((b: any, a: any) => a.height - b.height)
      .slice(0, 5);
  };

  const shortest = (players: any) => {
    return [...players]
      .sort((a: any, b: any) => a.height - b.height)
      .slice(0, 5);
  };

  const heaviest = (players: any) => {
    return [...players]
      .sort((b: any, a: any) => a.weight - b.weight)
      .slice(0, 5);
  };

  const lightest = (players: any) => {
    return [...players]
      .sort((a: any, b: any) => a.weight - b.weight)
      .slice(0, 5);
  };

  const items: { column: string; list: any; name: string }[] = [
    { column: 'age', list: oldest, name: 'Oldest' },
    { column: 'height', list: tallest, name: 'Tallest' },
    { column: 'weight', list: heaviest, name: 'Heaviest' },
    { column: 'age', list: youngest, name: 'Youngest' },
    { column: 'height', list: shortest, name: 'Shortest' },
    { column: 'weight', list: lightest, name: 'Lightest' },
  ];

  return (
    <>
      <Table size='small'>
        <HeaderMain
          cells={[`${seasonId}-${seasonId - 1999} Interesting Facts`]}
        />
      </Table>
      <Grid container>
        {items.map((item: any) => (
          <Grid size={{ sm: 12, md: 4 }} key={item.name}>
            <TableContainer component={Paper}>
              <Table size='small'>
                <HeaderSection
                  cells={[
                    { text: '#' },
                    { text: `${item.name}` },
                    { text: '' },
                  ]}
                />
                <TableBody>
                  {item.list(players).map((player: any, key: any) => (
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
                      {item.column === 'age' ? (
                        <TableCell align='center'>
                          {player[item.column]}
                        </TableCell>
                      ) : (
                        <TableCell align='center'>
                          {player[item.column]}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PlayersFacts;
