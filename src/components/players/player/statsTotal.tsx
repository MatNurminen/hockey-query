import TableContainer from '@mui/material/TableContainer';
import {
  getPlayersStatsLeagues,
  getPlayersStatsTeams,
} from '../../../api/players-stats/queries';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableFlag from '../../common/Images/tableFlag';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid2';

const StatsTotal = ({ playerName, playerId }: any) => {
  const {
    data: leagues,
    isLoading: loadLeagues,
    isError: errLeagues,
  } = getPlayersStatsLeagues(playerId);

  const {
    data: teams,
    isLoading: loadTeams,
    isError: errTeams,
  } = getPlayersStatsTeams(playerId);

  if (loadLeagues || loadTeams) return <p>Loading...</p>;
  if (errLeagues || errTeams) return <p>Error</p>;
  if (!leagues || !teams) return <div>No data available</div>;

  const items: { id: number; title: string; data: any }[] = [
    { id: 1, title: 'league', data: leagues },
    { id: 2, title: 'team', data: teams },
  ];

  return (
    <Grid container spacing={2}>
      {items.map((item: any) => (
        <Grid size={{ sm: 12, md: 6 }} key={item.id}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <HeaderMain
                cells={[
                  `${playerName} Career Totals Per ${item.title}`,
                  '',
                  '',
                  '',
                  '',
                ]}
              />
            </Table>
            <Table size='small'>
              <HeaderSection
                cells={[
                  { text: item.title },
                  { align: 'center', text: 'Years' },
                  { align: 'center', text: 'GP' },
                  { align: 'center', text: 'G' },
                  { align: 'center', text: 'PPG' },
                ]}
              />
              <TableBody>
                {item.data.map((stat: any) => (
                  <TableRow key={stat.league_id || stat.team_id}>
                    <TableCell>
                      <Box display='flex' alignItems='center'>
                        <TableFlag src={stat.logo || stat.flag} />
                        <Link
                          underline='hover'
                          component={RouterLink}
                          to='xxx'
                          ml={1}
                        >
                          {stat.short_name || stat.full_name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell align='center'>{stat.years}</TableCell>
                    <TableCell align='center'>{stat.games_t}</TableCell>
                    <TableCell align='center'>{stat.goals_t}</TableCell>
                    <TableCell align='center'>
                      {(stat.goals_t / stat.games_t || 0).toFixed(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsTotal;
