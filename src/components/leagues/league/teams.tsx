import Box from "@mui/material/Box";
import SectionChapter from "../../common/Sections/sectionChapter";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableFlag from "../../common/Images/tableFlag";
import LinkRoute from "../../common/LinkRoute";
import { getTeamsByLeague } from "../../../api/teams/queries";
import { memo } from "react";

interface Props {
  leagueId: number;
  title: string;
}

const Teams = ({ leagueId, title }: Props) => {
  const { data } = getTeamsByLeague(leagueId);
  const teams = data || [];

  return (
    <Box my={2}>
      <SectionChapter content={`${title} teams list`} />
      <List
        sx={{ columns: { sm: 2, md: 3, lg: 4 }, pb: 1 }}
        dense
        disablePadding
      >
        {teams.map((team) => (
          <ListItem key={team.id}>
            <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
              <TableFlag alt="" src={team.flag} />
            </ListItemIcon>
            <LinkRoute to={`/teams/${team.id}`}>
              <ListItemText primary={team.full_name} />
            </LinkRoute>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(Teams);
