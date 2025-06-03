import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import { useSearchParams } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import SectionHeader from '../../common/Sections/sectionHeader';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import { getDraftDetails } from '../../../api/players/queries';
import TableFlag from '../../common/Images/tableFlag';

const DraftDetails = () => {
  const [searchParams] = useSearchParams();
  const nationId = Number(searchParams.get('nation'));
  const teamId = Number(searchParams.get('team'));
  let header = '';
  let players;

  if (nationId) {
    const { data, isLoading, isError } = getDraftDetails({
      nationId,
    });
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;
    if (!data) return <div>No data available</div>;
    players = data;
    header = `By Nation: ${players[0].name}`;
  } else if (teamId) {
    const { data, isLoading, isError } = getDraftDetails({
      teamId,
    });
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;
    if (!data) return <div>No data available</div>;
    players = data;
    header = `By Nation: ${players[0].name}`;
    header = `Drafted by ${players[0].full_name}`;
  }

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <SectionHeader txtAlign='left' content='NHL Entry Draft' />
      <SectionHeader txtAlign='left' content={header} />
      <TableContainer component={Paper}>
        <Table size='small'>
          <HeaderMain cells={['Drafted Players']} />
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table size='small'>
          <HeaderSection
            cells={[
              { align: 'center', text: '#' },
              { text: 'Team' },
              { text: 'Player' },
              { align: 'center', text: 'Seasons' },
              { align: 'center', text: 'GP' },
              { align: 'center', text: 'G' },
            ]}
          />
          <TableBody>
            {players?.map((player: any, key: number) => (
              <TableRow key={player.id}>
                <TableCell align='center'>{key + 1}</TableCell>
                <TableCell>
                  <Link
                    underline='hover'
                    component={RouterLink}
                    to={`/teams/${player.draft_team_id}`}
                  >
                    {player.full_name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Box display='flex' alignItems='center'>
                    <TableFlag src={player.flag} />
                    <Link
                      underline='hover'
                      component={RouterLink}
                      to={`/players/${player.id}`}
                      ml={1}
                    >
                      {`${player.first_name} ${player.last_name} (${player.player_position})`}
                    </Link>
                  </Box>
                </TableCell>
                <TableCell align='center'>
                  {player.years_t ? player.years_t : null}
                </TableCell>
                <TableCell align='center'>{player.games_t}</TableCell>
                <TableCell align='center'>{player.goals_t}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DraftDetails;
