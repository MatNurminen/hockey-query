import Grid from '@mui/material/Grid2';
import SectionHeader from '../../common/Sections/sectionHeader';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import HeaderMain from '../../common/Table/headerMain';
import MainLogo from '../../common/Images/mainLogo';

import { getPlayersCountByNation } from '../../../api/players/queries';
import { getTeamsCountByNation } from '../../../api/teams/queries';
import GreenButton from '../../common/Buttons/greenButton';
import { useState } from 'react';
import UpdateNation from '../../admin/nations/updateNation';

const Header = ({ nation, nationId }: { nation: any; nationId: number }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    data: plrs,
    isError: plrsError,
    isLoading: plrsLoading,
  } = getPlayersCountByNation(nationId);
  const {
    data: tms,
    isError: tmsError,
    isLoading: tmsLoading,
  } = getTeamsCountByNation(nationId);

  if (plrsLoading || tmsLoading) return <h3>Loading...</h3>;
  if (plrsError || tmsError) return <h3>Error!</h3>;
  const playersCount = plrs || 0;
  const teamsCount = tms || 0;

  return (
    <>
      <Grid container spacing={2}>
        <Grid my={3} size={{ md: 6, sm: 12 }}>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            mt={-2}
          >
            <Grid size={2}>
              <img alt='' width={60} src={nation.flag} />
            </Grid>
            <Grid size={10}>
              <SectionHeader
                txtAlign='left'
                content={nation.name + ', ' + nation.short_name}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid
              size={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: nation.color || '#fff',
                  border: '2px solid #ccc',
                }}
              />
            </Grid>
            <Grid size={10}>
              <MainLogo src={nation.logo} />
            </Grid>
          </Grid>
        </Grid>
        <Grid my={3} size={{ md: 6, sm: 12 }}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <HeaderMain cells={[`DATABASE STATS - ${nation.name}`, '']} />
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Box>Players in database</Box>
                  </TableCell>
                  <TableCell>
                    <Box>{playersCount}</Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box>Teams in database</Box>
                  </TableCell>
                  <TableCell>
                    <Box>{teamsCount}</Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid textAlign='right' size={{ xs: 12 }} sx={{ mb: 1 }}>
          <GreenButton
            text='Edit Nation'
            onClick={handleOpen}
            size='small'
            iconIndex={1}
          />
        </Grid>
      </Grid>
      <UpdateNation nationId={nationId} open={open} onClose={handleClose} />
    </>
  );
};

export default Header;
