import SectionChapter from "../../common/Sections/sectionChapter";
import { getTeamChampions } from "../../../api/teams-stats/queries";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import { TTeamChampions } from "../../../api/teams-stats/types";
import { memo } from "react";

interface Props {
  title: string;
  leagueId: number;
}

const Champions = ({ title, leagueId }: Props) => {
  const { data, isLoading, isError } = getTeamChampions(leagueId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;

  const chunkSize = Math.ceil((data?.length ?? 0) / 4);
  const columns: TTeamChampions[][] = Array.from(
    { length: 4 },
    (_, i) => data?.slice(i * chunkSize, (i + 1) * chunkSize) ?? [],
  );

  return (
    <>
      <SectionChapter
        txtAlign="left"
        content={"List of " + title + " Champions"}
      />
      {data?.length ? (
        <Stack direction="row" spacing={2}>
          {columns.map((columnTeams, colIndex) => (
            <List key={colIndex} sx={{ pb: 1, flex: 1 }}>
              {columnTeams.map((team) => (
                <ListItem
                  key={team.season_id + team.team_id}
                  sx={{ py: 0, minHeight: "auto" }}
                >
                  <ListItemText
                    primary={
                      <Stack direction="row" spacing={1}>
                        <Link
                          underline="hover"
                          component={RouterLink}
                          to={`/rosters?league=${leagueId}&season=${team.season_id}`}
                        >
                          <Typography fontWeight="600" variant="body2">
                            {team.season_id + 1}
                          </Typography>
                        </Link>
                        <Link
                          underline="hover"
                          component={RouterLink}
                          to={`/teams/${team.team_id}?season=${team.season_id}`}
                        >
                          <Typography variant="body2">
                            {team.full_name}
                          </Typography>
                        </Link>
                      </Stack>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ))}
        </Stack>
      ) : null}
    </>
  );
};

export default memo(Champions);
