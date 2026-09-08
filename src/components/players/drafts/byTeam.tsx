import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import TableFlag from "../../common/Images/tableFlag";
import SectionChapter from "../../common/Sections/sectionChapter";
import { getDraftTeams } from "../../../api/players/queries";
import { memo } from "react";
import LinkRoute from "../../common/LinkRoute";

const ByTeam = () => {
  const { data: drafts, isError, isLoading } = getDraftTeams();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!drafts?.length) return <h3>No data available</h3>;

  return (
    <>
      <SectionChapter txtAlign="left" content="Draft selections by team" />
      <List sx={{ columns: { xs: 1, sm: 2, md: 3 } }} dense>
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
                <LinkRoute
                  underline="hover"
                  to={`/drafts/dets?team=${draft.id}`}
                >
                  {draft.full_name} {draft.plrs} plrs
                </LinkRoute>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default memo(ByTeam);
