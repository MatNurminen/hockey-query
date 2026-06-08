import Box from "@mui/material/Box";
import SectionChapter from "../../common/Sections/sectionChapter";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TableFlag from "../../common/Images/tableFlag";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { getTeamsByLeague } from "../../../api/teams/queries";
import { memo } from "react";
import { TTeamsByLeague } from "../../../api/teams/types";

interface Props {
  leagueId: number;
  title: string;
}

const Teams = ({ leagueId, title }: Props) => {
  const { data, isLoading, isError } = getTeamsByLeague(leagueId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  return (
    <Box my={2}>
      <SectionChapter txtAlign="left" content={title + " teams list"} />
      <List
        sx={{ columns: { sm: 2, md: 3, lg: 4 }, pb: 1 }}
        dense={true}
        disablePadding={true}
      >
        {data.map((team: TTeamsByLeague) => (
          <ListItem key={team.id}>
            <ListItemIcon sx={{ mr: -2 }}>
              <TableFlag alt="" src={team.flag} />
            </ListItemIcon>
            <Link
              underline="hover"
              component={RouterLink}
              to={"/teams/" + team.id}
            >
              <ListItemText primary={team.full_name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(Teams);
