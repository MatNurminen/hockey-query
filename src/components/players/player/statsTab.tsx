import { memo, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import { getPlayersStatsDetail } from "../../../api/players-stats/queries";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import HeaderSection from "../../common/Table/headerSection";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { TPlayerStatDetail } from "../../../api/players-stats/types";
import SectionChapter from "../../common/Sections/sectionChapter";

interface Props {
  playerName: string;
  playerId: number;
  typeId: number;
  setLastTeam: React.Dispatch<React.SetStateAction<TPlayerStatDetail | null>>;
}

const StatsTab = ({ playerName, playerId, typeId, setLastTeam }: Props) => {
  const {
    data: stats,
    isLoading,
    isError,
  } = getPlayersStatsDetail({
    playerId,
  });

  useEffect(() => {
    if (!stats) return;

    const leagueTeams = stats.data.filter((team) => team.type_id === 1);
    if (leagueTeams.length === 0) return;

    const lastTeam = leagueTeams.reduce((max, season) =>
      season.season_id > max.season_id ? season : max,
    );

    setLastTeam(lastTeam);
  }, [stats, setLastTeam]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!stats) return <div>No data available</div>;

  return (
    <>
      <SectionChapter content={`${playerName} Statistics`} txtAlign={"left"} />
      <TableContainer component={Paper}>
        <Table size="small">
          <HeaderSection
            cells={[
              { text: "Season" },
              { text: "Team" },
              { text: "League" },
              { align: "center", text: "Age" },
              { align: "center", text: "GP" },
              { align: "center", text: "G" },
              { align: "center", text: "PPG" },
              { text: "Postseason" },
            ]}
          />
          <TableBody>
            {stats.data
              .sort((a, b) => b.season_id - a.season_id)
              .filter((stat) => stat.type_id === typeId)
              .map((stat) => (
                <TableRow key={stat.id}>
                  <TableCell>{stat.name}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <TableFlag src={stat.team_flag} alt="" />
                      <Link
                        underline="hover"
                        component={RouterLink}
                        to={`/teams/${stat.team_id}?season=${stat.season_id}`}
                        ml={1}
                      >
                        {stat.full_name}
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Link
                      underline="hover"
                      component={RouterLink}
                      to={`/leagues/${stat.league_id}?season=${stat.season_id}`}
                    >
                      {stat.short_name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    {stat.season_id - stat.birth_year}
                  </TableCell>
                  <TableCell align="center">{stat.games}</TableCell>
                  <TableCell align="center">{stat.goals}</TableCell>
                  <TableCell align="center">
                    {(stat.goals / stat.games || 0).toFixed(1)}
                  </TableCell>
                  <TableCell>{stat.postseason}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(StatsTab);
