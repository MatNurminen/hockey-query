import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import SectionHeader from "../../common/Sections/sectionHeader";
import HeaderMain from "../../common/Table/headerMain";
import Table from "@mui/material/Table";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import TableFlag from "../../common/Images/tableFlag";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { getTeams } from "../../../api/teams/queries";
import { useMemo, useState } from "react";
import { useLatestSeason } from "../../../hooks/useLatestSeason";
import GreenButton from "../../common/Buttons/greenButton";
import AddTeam from "../../admin/teams/addTeam";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { TTeamDto } from "../../../api/teams/types";

const Teams = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { startYear: seasonId } = useLatestSeason();

  const { data: teams, isLoading, isError } = getTeams();

  const groupedTeams = useMemo(() => {
    const map = new Map<string, TTeamDto[]>();
    if (!teams) return map;
    const sorted = teams.toSorted((a, b) =>
      a.full_name.localeCompare(b.full_name),
    );
    for (const team of sorted) {
      const letter = team.full_name[0];
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(team);
    }
    return map;
  }, [teams]);

  return (
    <Container sx={{ pt: 1, mb: 10 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid size={8}>
          <SectionHeader txtAlign="left" content="Teams" />
        </Grid>
        <Grid size={4} textAlign="end">
          <GreenButton
            onClick={handleOpen}
            text="Add Team"
            size="small"
            iconIndex={0}
          />
        </Grid>
      </Grid>
      <AddTeam open={open} onClose={handleClose} />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error Teams!</p>
      ) : !teams ? (
        <p>No data available</p>
      ) : (
        <>
          {[...groupedTeams.entries()].map(([letter, letterTeams]) => (
            <TableContainer component={Paper} key={letter} sx={{ mt: 2 }}>
              <Table size="small">
                <HeaderMain cells={[{ text: letter }]} />
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <List
                        sx={{ columns: { sm: 2, md: 3, lg: 4 } }}
                        dense
                        disablePadding
                      >
                        {letterTeams.map((team: TTeamDto) => (
                          <ListItem key={team.id}>
                            <ListItemIcon sx={{ mr: -2 }}>
                              <TableFlag
                                src={team.nation.flag}
                                alt={team.nation.name}
                              />
                            </ListItemIcon>
                            <ListItemText>
                              <Link
                                underline="hover"
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
        </>
      )}
    </Container>
  );
};

export default Teams;
