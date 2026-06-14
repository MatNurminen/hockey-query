import { useMemo } from "react";
import HeaderMain from "../common/Table/headerMain";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import Link from "@mui/material/Link";
import TableFlag from "../common/Images/tableFlag";
import ClubHeader from "./clubHeader";
import { getStandings } from "../../api/teams-stats/queries";
import { getPlayersStatsDetail } from "../../api/players-stats/queries";
import type { TStandings } from "../../api/teams-stats/types";
import type { TPlayerStatDetail } from "../../api/players-stats/types";

const Players = () => {
  const [searchParams] = useSearchParams();
  const leagueId = useMemo(
    () => [Number(searchParams.get("league"))],
    [searchParams]
  );
  const seasonId = Number(searchParams.get("season"));

  const {
    data: teams = [],
    isError,
    isLoading,
  } = getStandings({ leagueId, seasonId });

  const { data: playersResponse } = getPlayersStatsDetail({
    leagueId,
    seasonId,
  });
  const players = playersResponse?.data ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!teams) return <p>No data available</p>;
  if (!players) return <p>No data available</p>;

  return (
    <TableContainer component={Paper}>
      {teams
        .sort((a: TStandings, b: TStandings) => a.full_name.localeCompare(b.full_name))
        .map((team: TStandings) => (
          <div key={team.id}>
            <ClubHeader team={team.full_name} logo={team.logo} />
            <Table size="small">
              <HeaderMain
                align="center"
                cells={[
                  "#",
                  "Pos",
                  "Nat",
                  "Name",
                  "GP",
                  "G",
                  "Postseason",
                  "Age",
                  "Born",
                  "Height",
                  "Weight",
                ]}
              />
              <TableBody>
                {players
                  .filter((player: TPlayerStatDetail) => player.team_id === team.team_id)
                  .sort((a: TPlayerStatDetail, b: TPlayerStatDetail) => a.player_order - b.player_order)
                  .map((player: TPlayerStatDetail, key: number) => (
                    <TableRow key={key}>
                      <TableCell>{player.jersey_number}</TableCell>
                      <TableCell>{player.player_position}</TableCell>
                      <TableCell>
                        <TableFlag src={player.player_flag} alt="" />
                      </TableCell>
                      <TableCell>
                        <Link
                          underline="hover"
                          component={RouterLink}
                          to={`/players/${player.player_id}`}
                        >
                          {player.first_name} {player.last_name}
                        </Link>
                      </TableCell>
                      <TableCell>{player.games}</TableCell>
                      <TableCell>{player.goals}</TableCell>
                      <TableCell>{player.postseason}</TableCell>
                      <TableCell>
                        {player.season_id - player.birth_year}
                      </TableCell>
                      <TableCell>{player.birth_year}</TableCell>
                      <TableCell>{player.height}</TableCell>
                      <TableCell>{player.weight}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ))}
    </TableContainer>
  );
};

export default Players;
