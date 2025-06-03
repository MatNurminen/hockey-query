import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import SectionHeader from '../../common/Sections/sectionHeader';
import HeaderMain from '../../common/Table/headerMain';
import Table from '@mui/material/Table';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import TableFlag from '../../common/Images/tableFlag';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { getTeams } from '../../../api/teams/queries';
import { useState } from 'react';
import GreenButton from '../../common/Buttons/greenButton';
import AddTeam from '../../admin/teams/addTeam';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

const Teams = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const seasonId: number = 2024;

  const { data: teams } = getTeams();

  const letters = teams
    ?.sort((a, b) => a.full_name.localeCompare(b.full_name))
    .map((team: any) => team.full_name.slice(0, 1));
  const alphabet = [...new Set(letters)];

  const teams_list = (teams: any, letter: any) => {
    return teams.filter((f: any) => f.full_name.startsWith(letter));
  };

  return (
    <Container sx={{ pt: 1, mb: 10 }}>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid size={8}>
          <SectionHeader txtAlign='left' content='Teams' />
        </Grid>
        <Grid size={4} textAlign={'end'}>
          <GreenButton
            onClick={handleOpen}
            text='Add Team'
            size='small'
            iconIndex={0}
          />
        </Grid>
        {/* <Grid sx={{ pt: 10, pb: 3 }} item xs={4}>
          <SelectLocation
            options={nations}
            param_key='nation_id'
            callback={(search) => getNationByIdAsync(Number(search))}
          />
        </Grid> */}
      </Grid>
      <AddTeam open={open} onClose={handleClose} />

      {alphabet.map((alph) => (
        <TableContainer component={Paper} key={alph} sx={{ mt: 2 }}>
          <Table size='small'>
            {/* <caption></caption> */}
            <HeaderMain cells={[`${alph}`]} />
            <TableBody>
              <TableRow>
                <TableCell>
                  <List
                    sx={{ columns: { sm: 2, md: 3, lg: 4 } }}
                    dense={true}
                    disablePadding={true}
                  >
                    {teams_list(teams, alph).map((team: any) => (
                      <ListItem key={team.id}>
                        <ListItemIcon sx={{ mr: -2 }}>
                          <TableFlag src={team.nation.flag} />
                        </ListItemIcon>
                        <ListItemText>
                          <Link
                            underline='hover'
                            component={RouterLink}
                            to={`/teams/${team.id}?season=${seasonId}`}
                          >
                            {team.full_name}
                          </Link>
                        </ListItemText>
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Container>
  );
};

export default Teams;
