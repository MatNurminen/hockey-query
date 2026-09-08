import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import HeaderSection from "../../common/Table/headerSection";
import HeaderPosition from "../../common/Table/headerPosition";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import { memo } from "react";
import { TPlayerStatDetail } from "../../../api/players-stats/types";
import SectionChapter from "../../common/Sections/sectionChapter";
import LinkRoute from "../../common/LinkRoute";
import Selects from "./selects";
import { tournaments } from "./tournaments";
import { useSearchParams } from "react-router-dom";

interface Props {
  nation: string;
  title: string;
  players: TPlayerStatDetail[];
}

const StatsTab = ({ nation, title, players }: Props) => {
  const [searchParams] = useSearchParams();
  const tournamentId = Number(searchParams.get("tournament")) || 0;
  const tournamentName =
    tournaments.find((t) => t.id === tournamentId)?.name ?? "Europe";
  const leagues = [
    ...new Map(
      players.map((item) => [
        item.league_id,
        { league_id: item.league_id, short_name: item.short_name },
      ]),
    ).values(),
  ];

  return (
    <>
      <SectionChapter
        content={`${nation} ${title} in ${tournamentName}`}
        txtAlign="left"
      />
      <Box m={2}>
        <Selects />
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <HeaderSection
            cells={[
              { text: "Player", width: "20%" },
              { text: "Team", width: "20%" },
              { align: "center", text: "Born" },
              { align: "center", text: "Height" },
              { align: "center", text: "Weight" },
              { align: "center", text: "GP" },
              { align: "center", text: "G" },
              { text: "Postseason", width: "15%" },
            ]}
          />

          {leagues
            .toSorted((a, b) => a.short_name.localeCompare(b.short_name))
            .map((league) => {
              const leaguePlayers = players.filter(
                (player) => player.league_id === league.league_id,
              );
              if (leaguePlayers.length === 0) {
                return null;
              }

              return (
                <TableBody key={league.league_id}>
                  <HeaderPosition
                    row
                    cells={[league.short_name]}
                    colSpan={8}
                  />
                  {leaguePlayers.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell sx={{ minWidth: 160 }}>
                          <LinkRoute
                            underline="hover"
                            to={`/players/${player.player_id}`}
                          >
                            {player.first_name} {player.last_name} (
                            {player.player_position})
                          </LinkRoute>
                        </TableCell>
                        <TableCell sx={{ minWidth: 160 }}>
                          <Box display="flex" alignItems="center">
                            <TableFlag alt="flag" src={player.team_flag} />
                            <LinkRoute
                              underline="hover"
                              to={`/teams/${player.team_id}`}
                              ml={1}
                            >
                              {player.full_name}
                            </LinkRoute>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          {player.birth_year}
                        </TableCell>
                        <TableCell align="center">{player.height}</TableCell>
                        <TableCell align="center">{player.weight}</TableCell>
                        <TableCell align="center">{player.games}</TableCell>
                        <TableCell align="center">{player.goals}</TableCell>
                        <TableCell sx={{ minWidth: 160 }}>
                          {player.postseason}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              );
            })}
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(StatsTab);
