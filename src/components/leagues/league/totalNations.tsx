import { memo } from "react";
import Box from "@mui/material/Box";
import SectionChapter from "../../common/Sections/sectionChapter";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableFlag from "../../common/Images/tableFlag";
import { getCountPlayersByNation } from "../../../api/players-stats/queries";
import LinkRoute from "../../common/LinkRoute";

interface Props {
  leagueId: number;
  seasonId: number;
}

const TotalNations = ({ leagueId, seasonId }: Props) => {
  const { data, isLoading, isError } = getCountPlayersByNation({ leagueId });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data || data.length === 0) return <h3>No data available</h3>;

  return (
    <Box my={2}>
      <SectionChapter
        txtAlign="left"
        content="Player Nationalities Throughout History"
      />
      <List
        sx={{ columns: { xs: 2, md: 3, lg: 4 }, pb: 1 }}
        dense
        disablePadding
      >
        {data.map((nat) => (
          <ListItem key={nat.id} sx={{ breakInside: "avoid" }}>
            <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
              <TableFlag src={nat.flag} alt="" />
            </ListItemIcon>
            <LinkRoute
              to={`/league-stats?league=${leagueId}&season=${seasonId}&tab=two&nationId=${nat.id}`}
            >
              <ListItemText
                primary={`${nat.count} ${
                  nat.count === 1 ? "player" : "players"
                }`}
              />
            </LinkRoute>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(TotalNations);
