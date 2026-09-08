import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import SectionChapter from "../../common/Sections/sectionChapter";
import TableFlag from "../../common/Images/tableFlag";
import { getDraftNations } from "../../../api/players/queries";
import { memo } from "react";
import LinkRoute from "../../common/LinkRoute";

const ByNation = () => {
  const { data: drafts, isError, isLoading } = getDraftNations();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!drafts?.length) return <h3>No data available</h3>;

  return (
    <>
      <SectionChapter txtAlign="left" content="Draft selections by nation" />
      <List sx={{ columns: { xs: 1, sm: 2, md: 4 } }} dense>
        {drafts.map((draft) => (
          <ListItem key={draft.id} sx={{ gap: 2 }}>
            <ListItemAvatar sx={{ minWidth: 0 }}>
              <TableFlag src={draft.flag} alt={draft.name} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <LinkRoute
                  underline="hover"
                  to={`/drafts/dets?nation=${draft.id}`}
                >
                  {draft.name} {draft.plrs} plrs
                </LinkRoute>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default memo(ByNation);
