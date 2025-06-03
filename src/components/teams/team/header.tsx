import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import SectionHeader from '../../common/Sections/sectionHeader';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import HeaderMain from '../../common/Table/headerMain';
import MainLogo from '../../common/Images/mainLogo';
import GreenButton from '../../common/Buttons/greenButton';
import UpdateTeam from '../../admin/teams/updateTeam';

const Header = ({ team }: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ sm: 12, md: 6 }} mt={3}>
          <Grid
            container
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            mt={-2}
          >
            <Grid size={2}>
              <img alt='' width={60} src={team.nation.flag} />
            </Grid>
            <Grid size={10}>
              <SectionHeader txtAlign='left' content={team.full_name} />
            </Grid>
          </Grid>
        </Grid>
        <Grid my={3} size={{ sm: 12, md: 6 }}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <HeaderMain cells={['Team Facts', '']} />
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Box>Country</Box>
                  </TableCell>
                  <TableCell>
                    <Box>{team.nation.name}</Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box>Founded</Box>
                  </TableCell>
                  <TableCell>
                    <Box>{team.start_year}</Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Stack
            direction='row'
            justifyContent='flex-start'
            alignItems='center'
            spacing={5}
          >
            {team?.logos.map((logo: any, key: any) => (
              <Box key={key} textAlign='center'>
                <MainLogo src={logo.logo} />
                <Typography variant='body1' gutterBottom>
                  {logo.start_year} - {logo.end_year}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Grid>
        <Grid textAlign='right' size={{ xs: 12 }} sx={{ mb: 1 }}>
          <GreenButton
            text='Edit Team'
            onClick={handleOpen}
            size='small'
            iconIndex={1}
          />
        </Grid>
      </Grid>
      <UpdateTeam teamId={team.id} open={open} onClose={handleClose} />
    </>
  );
};

export default Header;
