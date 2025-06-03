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
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MainLogo from '../../common/Images/mainLogo';

import { getNation } from '../../../api/nations/queries';
import GreenButton from '../../common/Buttons/greenButton';
// import { useQuery } from '@apollo/client';
// import { GET_NATION } from '../../../queries/Nations';
// import { GET_PLAYERS_DB_COUNT_BY_NATION } from '../../../queries/Players';
// import { GET_TEAMS_COUNT_BY_NATION } from '../../../queries/Teams';
import { useState } from 'react';
import UpdateNation from '../../admin/nations/updateNation';

const Header = ({ nationId }: { nationId: number }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const { data, error, loading, refetch } = useQuery(GET_NATION, {
  //   variables: { nationId },
  //   onCompleted: (data) => {
  //     setNatName(data.nation.name);
  //   },
  // });
  // const {
  //   data: dataPC,
  //   error: errorPC,
  //   loading: loadingPC,
  // } = useQuery(GET_PLAYERS_DB_COUNT_BY_NATION, {
  //   variables: { nationId },
  // });
  // const {
  //   data: dataTM,
  //   error: errorTM,
  //   loading: loadingTM,
  // } = useQuery(GET_TEAMS_COUNT_BY_NATION, {
  //   variables: { nationId },
  // });

  // if (error || errorPC || errorTM) return <p>Error</p>;
  // if (loading || loadingPC || loadingTM) return <p>Loading...</p>;

  // const nation = data.nation;
  // const plrs = dataPC.playersDbCountByNation[0];
  // const tms = dataTM.teamsByNationCount[0];

  const { data: nation, isError, isLoading } = getNation(nationId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!nation) return <h3>No data available</h3>;

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
            <Grid size={2}></Grid>
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
                    {/* <Box className={classes.factValue}>{plrs.plrs}</Box> */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box>Teams in database</Box>
                  </TableCell>
                  <TableCell>
                    {/* <Box className={classes.factValue}>{tms.tms}</Box> */}
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
