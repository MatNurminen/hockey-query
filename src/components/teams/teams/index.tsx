import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import SectionHeader from "../../common/Sections/sectionHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableFlag from "../../common/Images/tableFlag";
import { getTeams } from "../../../api/teams/queries";
import { memo, useMemo, useState } from "react";
import { useLatestSeason } from "../../../hooks/useLatestSeason";
import AppButton from "../../common/Buttons/appButton";
import AddTeam from "../../admin/teams/addTeam";
import Paper from "@mui/material/Paper";
import { TTeamDto } from "../../../api/teams/types";
import LinkRoute from "../../common/LinkRoute";
import SectionChapter from "../../common/Sections/sectionChapter";

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
      a.full_name.localeCompare(b.full_name, undefined, { sensitivity: "base" }),
    );
    for (const team of sorted) {
      const first = team.full_name[0] ?? "";
      const letter = /[a-z]/i.test(first) ? first.toUpperCase() : "#";
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
          <AppButton
            onClick={handleOpen}
            text="Add Team"
            size="small"
            iconName="add"
            color="success"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
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
        <Paper>
          {[...groupedTeams.entries()].map(([letter, letterTeams]) => (
            <div key={letter}>
              <SectionChapter content={letter} />
              <List sx={{ columns: { sm: 2, md: 3, lg: 4 } }} dense>
                {letterTeams.map((team: TTeamDto) => (
                  <ListItem key={team.id}>
                    <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                      <TableFlag
                        src={team.nation.flag}
                        alt={team.nation.name}
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <LinkRoute
                        underline="hover"
                        to={
                          seasonId
                            ? `/teams/${team.id}?season=${seasonId}`
                            : `/teams/${team.id}`
                        }
                      >
                        {team.full_name}
                      </LinkRoute>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </div>
          ))}
        </Paper>
      )}
    </Container>
  );
};

export default memo(Teams);
