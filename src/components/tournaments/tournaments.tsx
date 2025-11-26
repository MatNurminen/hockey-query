import { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { getTournamentsByLeague } from '../../api/tournaments/queries';
import HeaderMain from '../common/Table/headerMain';
import HeaderSection from '../common/Table/headerSection';
import { useDeleteTournament } from '../../api/tournaments/mutations';
import AppButton from '../common/Buttons/appButton';
import DeleteDialog from '../common/Dialogs/deleteDialog';
import GreenButton from '../common/Buttons/greenButton';
import TableFlag from '../common/Images/tableFlag';
import Box from '@mui/material/Box';
import { TTournamentByLeagueDto } from '../../api/tournaments/types';

const TournamentsByLeague = ({ leagueId }: any) => {
  const [selectedTournament, setSelectedTournament] = useState<any | null>(
    null
  );
  const {
    data: tournaments,
    isLoading,
    isError,
  } = getTournamentsByLeague(leagueId);
  const { mutate: deleteTournament } = useDeleteTournament(leagueId);

  if (isError) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!tournaments) return <h3>No data available</h3>;

  const handleOpen = (id: number) => {
    setSelectedTournament(id);
  };

  const handleClose = () => {
    setSelectedTournament(null);
  };

  const handleDelete = () => {
    if (selectedTournament) {
      deleteTournament(
        { id: selectedTournament },
        {
          onSuccess: () => setSelectedTournament(null),
        }
      );
    }
  };

  return (
    <>
      <DeleteDialog
        open={Boolean(selectedTournament)}
        onClose={handleClose}
        name={`Tournament ID: ${selectedTournament}`}
        onConfirm={handleDelete}
      />
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table size='small'>
          <HeaderMain cells={['tournaments', '', '', '', '']} />
          <HeaderSection
            cells={[
              { align: 'center', text: 'ID' },
              { align: 'center', text: 'Season' },
              { text: 'League', width: '20%' },
              { text: '' },
              { text: '' },
            ]}
          />
          <TableBody>
            {tournaments.map((tournament: TTournamentByLeagueDto) => (
              <TableRow key={tournament.id}>
                <TableCell width={'10%'} align='center'>
                  {tournament.id}
                </TableCell>
                <TableCell width={'20%'} align='center'>
                  {tournament.season}
                </TableCell>
                <TableCell width={'50%'}>
                  <Box display='flex' alignItems='center'>
                    <Box display='flex' sx={{ mr: 1 }}>
                      <TableFlag src={tournament.logo} />
                    </Box>
                    {tournament.league}
                  </Box>
                </TableCell>
                <TableCell width={'10%'}>
                  <Link
                    component={RouterLink}
                    to={`/tournaments/${tournament.id}`}
                  >
                    <GreenButton text='Edit' size='small' iconIndex={1} />
                  </Link>
                </TableCell>
                <TableCell width={'10%'}>
                  <AppButton
                    text='Delete'
                    size='small'
                    color='error'
                    onClick={() => {
                      handleOpen(tournament.id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TournamentsByLeague;
