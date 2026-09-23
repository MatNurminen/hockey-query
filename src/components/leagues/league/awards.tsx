import Box from "@mui/material/Box";
import SectionChapter from "../../common/Sections/sectionChapter";
import { TLeagueDto } from "../../../api/leagues/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { memo } from "react";

interface Props {
  league: TLeagueDto;
}

const Awards = ({ league }: Props) => {
  return (
    <Box my={3}>
      <SectionChapter txtAlign="left" content={league.short_name + " awards"} />
      <List sx={{ columns: { sm: 1, md: 2 }, pb: 1 }} dense disablePadding>
        {league.awards?.map((award) => (
          <ListItem key={award.id}>
            <ListItemText primary={league.short_name + " " + award.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(Awards);
