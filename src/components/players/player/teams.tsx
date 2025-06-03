import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import TableFlag from '../../common/Images/tableFlag';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

import { useQuery } from '@apollo/client';
import { GET_PLAYER_STATS_BY_TEAMS } from '../../../queries/PlayersTournaments';

const Teams = ({ playerId }: any) => {
  const { loading, error, data } = useQuery(GET_PLAYER_STATS_BY_TEAMS, {
    variables: { playerId },
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  const teams = data.playerStatsByTeams;

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <HeaderMain cells={['Player Career By Team', '', '', '', '', '']} />
      </Table>
      <Table size='small'>
        <HeaderSection
          cells={[
            { text: 'Team' },
            { align: 'center', text: 'Years' },
            { align: 'center', text: 'GP' },
            { align: 'center', text: 'G' },
            { align: 'center', text: 'PGA' },
          ]}
        />
        <TableBody>
          {teams.map((team: any, key: any) => (
            <TableRow key={key}>
              <TableCell>
                <Link
                  underline='hover'
                  component={RouterLink}
                  to={`/teams/${team.team_id}`}
                >
                  {team.full_name}
                </Link>
              </TableCell>
              <TableCell align='center'>{team.years}</TableCell>
              <TableCell align='center'>{team.games_t}</TableCell>
              <TableCell align='center'>{team.goals_t}</TableCell>
              <TableCell align='center'>
                {(team.goals_t / team.games_t || 0).toFixed(1)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Teams;
