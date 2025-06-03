import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

import { useQuery } from '@apollo/client';
import { GET_PLAYER_STATS_BY_LEAGUES } from '../../../queries/PlayersTournaments';

const Leagues = ({ playerId }: any) => {
  const { loading, error, data } = useQuery(GET_PLAYER_STATS_BY_LEAGUES, {
    variables: { playerId },
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  const leagues = data.playerStatsByLeagues;

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <HeaderMain cells={['Player Career By League', '', '', '', '']} />
        <HeaderSection
          cells={[
            { text: 'League' },
            { align: 'center', text: 'Years' },
            { align: 'center', text: 'GP' },
            { align: 'center', text: 'G' },
            { align: 'center', text: 'PGA' },
          ]}
        />
        <TableBody>
          {leagues.map((league: any, key: any) => (
            <TableRow key={key}>
              <TableCell>
                <Link
                  underline='hover'
                  component={RouterLink}
                  to={`/leagues/${league.league_id}`}
                >
                  {league.short_name}
                </Link>
              </TableCell>
              <TableCell align='center'>{league.years}</TableCell>
              <TableCell align='center'>{league.games_t}</TableCell>
              <TableCell align='center'>{league.goals_t}</TableCell>
              <TableCell align='center'>
                {(league.goals_t / league.games_t || 0).toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leagues;
