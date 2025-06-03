import { memo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useMultipleStandings } from '../../../api/teams-stats/hooks';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';

const History = ({ title, teamId }: any) => {
  const configs = [
    {
      id: 1,
      name: 'History and Standings',
      params: {
        teamId,
        typeId: 1,
      },
    },
    {
      id: 2,
      name: 'Tournament Statistics',
      params: {
        teamId,
        typeId: 3,
      },
    },
  ];

  const { data: items, isError, isLoading } = useMultipleStandings(configs);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;

  return (
    <Grid container spacing={2}>
      {items.map((item: any) => (
        <Grid size={{ sm: 12 }} key={item.id}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <HeaderMain cells={[`${title} ${item.name}`]} />
            </Table>
            <Table size='small'>
              <HeaderSection
                cells={[
                  { text: 'Season', width: '6%' },
                  { text: 'League', width: '24%' },
                  { align: 'center', text: 'gp', width: '5%' },
                  { align: 'center', text: 'w', width: '5%' },
                  { align: 'center', text: 't', width: '5%' },
                  { align: 'center', text: 'l', width: '5%' },
                  { align: 'center', text: 'gf', width: '5%' },
                  { align: 'center', text: 'ga', width: '5%' },
                  { align: 'center', text: '+/-', width: '5%' },
                  { align: 'center', text: 'pts', width: '5%' },
                  { text: 'Postseason', width: '30%' },
                ]}
              />
              <TableBody>
                {item.list
                  .sort((a: any, b: any) => b.season_id - a.season_id)
                  .map((team: any) => (
                    <TableRow key={team.id}>
                      <TableCell>{team.season}</TableCell>
                      <TableCell>
                        <Link
                          underline='hover'
                          component={RouterLink}
                          to={`/leagues/${team.team_id}`}
                        >
                          {team.name}
                        </Link>
                      </TableCell>
                      <TableCell align='center'>{team.games}</TableCell>
                      <TableCell align='center'>{team.wins}</TableCell>
                      <TableCell align='center'>{team.ties}</TableCell>
                      <TableCell align='center'>{team.losts}</TableCell>
                      <TableCell align='center'>{team.goals_for}</TableCell>
                      <TableCell align='center'>{team.goals_against}</TableCell>
                      <TableCell align='center'>{team.gd}</TableCell>
                      <TableCell align='center'>{team.pts}</TableCell>
                      <TableCell>{team.postseason}</TableCell>
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

export default memo(History);
