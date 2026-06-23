import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SectionHeader from "../../common/Sections/sectionHeader";
import LinkRoute from "../../common/LinkRoute";
import { getLeaguesCurLogo } from "../../../api/leagues/queries";
import { formatSeason } from "../../utils/formatSeason";
import { TLeagueDto } from "../../../api/leagues/types";
import Link from "@mui/material/Link";
import { memo } from "react";

interface Props {
  curSeason: number;
}

const Leagues = ({ curSeason }: Props) => {
  const { data, isLoading, isError } = getLeaguesCurLogo();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data?.length) return <h3>No data available</h3>;

  return (
    <>
      <SectionHeader
        txtAlign="center"
        content={`Leagues Rosters ${formatSeason(curSeason)}`}
      />
      <List>
        <Divider />
        {data.map((league: TLeagueDto) => (
          <Link
            underline="none"
            component={LinkRoute}
            to={`/rosters?league=${league.id}&season=${curSeason}`}
            key={league.id}
          >
            <ListItem sx={{ my: 1 }}>
              <ListItemAvatar sx={{ mr: 2 }}>
                <Avatar
                  alt=""
                  sx={{ width: 56, height: 56 }}
                  src={league.logos.at(-1)?.logo}
                />
              </ListItemAvatar>
              <ListItemText primary={league.name} />
            </ListItem>
            <Divider />
          </Link>
        ))}
      </List>
    </>
  );
};

export default memo(Leagues);
