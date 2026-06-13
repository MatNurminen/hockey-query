import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getTeamsByTournament } from "../../../../api/teams-tournaments/queries";
import { TTeamByTournamentDto } from "../../../../api/teams-tournaments/types";

interface Props {
  tournamentId: number;
  handleToggle: (value: number) => () => void;
  checked: readonly number[];
}

const ListTournamentTeams = ({
  tournamentId,
  handleToggle,
  checked,
}: Props) => {
  const {
    data: teams,
    isLoading,
    isError,
  } = getTeamsByTournament(tournamentId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!teams) return <p>No data available</p>;

  return (
    <>
      <Paper
        elevation={4}
        sx={{ width: "100%", height: 470, overflow: "auto" }}
      >
        <List>
          {teams.map((team: TTeamByTournamentDto) => (
            <ListItem
              key={team.id}
              role="listitem"
              onClick={handleToggle(team.id)}
            >
              <Checkbox
                checked={checked.indexOf(team.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": team.id?.toString(),
                }}
              />
              <ListItemText id={team.id?.toString()} primary={team.full_name} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box ml={2} mt={1}>
        <Typography sx={{ fontWeight: 500 }} variant="body1">
          Teams: {teams.length}
        </Typography>
      </Box>
    </>
  );
};

export default ListTournamentTeams;
