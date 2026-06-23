import Box from "@mui/material/Box";
import { getLeaguesByNation } from "../../../api/leagues/queries";
import { memo } from "react";
import SectionChapter from "../../common/Sections/sectionChapter";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import TableFlag from "../../common/Images/tableFlag";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import ListItemText from "@mui/material/ListItemText";
import { TLeagueByNationDto } from "../../../api/leagues/types";
import { useLatestSeason } from "../../../hooks/useLatestSeason";

interface Props {
  nationId: number;
}

const Leagues = ({ nationId }: Props) => {
  const { data, isLoading, isError } = getLeaguesByNation(nationId);
  const { startYear: latestSeason } = useLatestSeason();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data?.length) return <h3>No data available</h3>;

  return (
    <Box my={2}>
      <SectionChapter txtAlign="left" content="Featured Leagues" />
      <List
        sx={{ columns: { sm: 2, md: 3, lg: 4 }, pb: 1 }}
        dense={true}
        disablePadding={true}
      >
        {data.map((league: TLeagueByNationDto) => (
          <ListItem key={league.id}>
            <ListItemIcon sx={{ mr: -2 }}>
              <TableFlag alt={league.short_name} src={league.flag} />
            </ListItemIcon>
            <Link
              underline="hover"
              component={RouterLink}
              to={`/leagues/${league.id}?season=${latestSeason}`}
            >
              <ListItemText primary={league.short_name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(Leagues);
