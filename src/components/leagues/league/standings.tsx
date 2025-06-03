import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import {
  getPrefetchStandings,
  getStandings,
} from '../../../api/teams-stats/queries';
import TableFlag from '../../common/Images/tableFlag';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import GreenButton from '../../common/Buttons/greenButton';
import Paper from '@mui/material/Paper';

const Standings = ({ leagueId, seasonId, title }: any) => {
  getPrefetchStandings(leagueId, seasonId - 1);

  const {
    data: data = [],
    isError,
    isLoading,
  } = getStandings({ leagueId, seasonId });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table size='small'>
          <HeaderMain
            cells={[`${seasonId}-${seasonId - 1999} ${title} Standings`]}
          />
        </Table>
        {Object.keys(data).length > 0 && (
          <Table size='small'>
            <HeaderSection
              cells={[
                { align: 'center', text: '#' },
                { text: 'team' },
                { align: 'center', text: 'gp' },
                { align: 'center', text: 'w' },
                { align: 'center', text: 't' },
                { align: 'center', text: 'L' },
                { align: 'center', text: 'GF' },
                { align: 'center', text: 'GA' },
                { align: 'center', text: '+/-' },
                { align: 'center', text: 'pts' },
                { text: 'Postseason' },
              ]}
            />
            <TableBody>
              {data.map((team: any, key: any) => (
                <TableRow key={team.id}>
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
        )}
      </TableContainer>
      <Box mt={1}>
        <GreenButton
          fullWidth
          text='Show Rosters'
          to={`/rosters?league=${leagueId}&season=${seasonId}`}
        />
      </Box>
    </>
  );
};

{
  /* <Router>
          <Link href="/">Link</Link>
          <Button href="/" variant="contained">
            Link
          </Button>
        </Router> */
}

export default Standings;
