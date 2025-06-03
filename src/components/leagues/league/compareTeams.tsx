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
import { getTeamFacts } from '../../../api/teams-stats/queries';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TableFlag from '../../common/Images/tableFlag';

const CompareTeams = ({ leagueId, seasonId, title }: any) => {
  const { data, isError, isLoading } = getTeamFacts(leagueId, seasonId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <HeaderMain
          cells={[`${seasonId}-${seasonId - 1999} ${title} Team Comparison`]}
        />
      </Table>
      <Table size='small'>
        <HeaderSection
          cells={[
            { align: 'center', text: '#' },
            { text: 'team' },
            { align: 'center', text: 'players' },
            { align: 'center', text: 'avg height' },
            { align: 'center', text: 'avg weight' },
            { align: 'center', text: 'avg age' },
          ]}
        />
        <TableBody>
          {data.map((team: any, key: any) => (
            <TableRow key={team.team_id}>
              <TableCell align='center'>{key + 1}</TableCell>
              <TableCell>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Box width={40} display='flex' justifyContent='center'>
                    <TableFlag src={team.logo} />
                  </Box>
                  <Box>
                    <Link
                      underline='hover'
                      component={RouterLink}
                      to={`/teams/${team.team_id}`}
                    >
                      {team.full_name}
                    </Link>
                  </Box>
                </Stack>
              </TableCell>
              <TableCell align='center'>{team.plrs}</TableCell>
              <TableCell align='center'>{team.avheight} cm</TableCell>
              <TableCell align='center'>{team.avweight} kg</TableCell>
              <TableCell align='center'>{team.avage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CompareTeams;
