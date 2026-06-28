import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import TableFlag from "../../common/Images/tableFlag";
import SectionChapter from "../../common/Sections/sectionChapter";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { getDraftTeams } from "../../../api/players/queries";
import { memo } from "react";

const ByTeam = () => {
  const { data: drafts, isError, isLoading } = getDraftTeams();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!drafts?.length) return <h3>No data available</h3>;

  return (
    <>
      <SectionChapter txtAlign="left" content="Draft selections by team" />
      <List sx={{ columns: { xs: 2, sm: 3 } }} dense={true}>
        {drafts.map((draft) => (
          <ListItem key={draft.id}>
            <ListItemAvatar
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TableFlag src={draft.logo} alt={draft.full_name} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link
                  underline="hover"
                  component={RouterLink}
                  to={`/drafts/dets?team=${draft.id}`}
                >
                  {draft.full_name} {draft.plrs} plrs
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default memo(ByTeam);
