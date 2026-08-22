import SectionChapter from "../../common/Sections/sectionChapter";
import { getTeamChampions } from "../../../api/teams-stats/queries";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { memo } from "react";
import Box from "@mui/material/Box";
import LinkRoute from "../../common/LinkRoute";

interface Props {
  title: string;
  leagueId: number;
}

const Champions = ({ title, leagueId }: Props) => {
  const { data, isLoading, isError } = getTeamChampions(leagueId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data</h3>;

  return (
    <Box my={2}>
      <SectionChapter content={"List of " + title + " Champions"} />
      <List
        sx={{ columns: { sm: 2, md: 3, lg: 4 }, pb: 1 }}
        dense
        disablePadding
      >
        {data.map((team) => (
          <ListItem key={team.season_id}>
            <LinkRoute
              to={`/rosters?league=${leagueId}&season=${team.season_id}`}
            >
              <ListItemText
                slotProps={{ primary: { sx: { fontWeight: 600 } } }}
                primary={team.season_id}
              />
            </LinkRoute>
            <LinkRoute
              ml={1}
              to={`/teams/${team.team_id}?season=${team.season_id}`}
            >
              <ListItemText primary={team.full_name} />
            </LinkRoute>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(Champions);
