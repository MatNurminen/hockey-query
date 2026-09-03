import HeaderMain from "../common/Table/headerMain";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableFlag from "../common/Images/tableFlag";
import ClubHeader from "./clubHeader";
import { TStandings } from "../../api/teams-stats/types";
import { TPlayerStatDetail } from "../../api/players-stats/types";
import { useMemo } from "react";
import { Cell } from "../common/Table/types";
import LinkRoute from "../common/LinkRoute";

interface Props {
  players: TPlayerStatDetail[];
  teams: TStandings[];
}

const columns: Cell[] = [
  { text: "#", align: "center" },
  { text: "Pos", align: "center" },
  { text: "Nat", align: "center" },
  { text: "Name" },
  { text: "GP", align: "center" },
  { text: "G", align: "center" },
  { text: "Postseason" },
  { text: "Age", align: "center" },
  { text: "Born", align: "center" },
  { text: "Height", align: "center" },
  { text: "Weight", align: "center" },
];

const Players = ({ players, teams }: Props) => {
  const sortedTeams = useMemo(
    () =>
      [...teams].toSorted((a: TStandings, b: TStandings) =>
        a.full_name.localeCompare(b.full_name),
      ),
    [teams],
  );

  return (
    <Paper>
      {sortedTeams.map((team: TStandings) => (
        <div key={team.id}>
          <ClubHeader team={team.full_name} logo={team.logo} />
          <TableContainer component={Paper}>
            <Table size="small">
              <HeaderMain cells={columns} />
              <TableBody>
                {players
                  .filter(
                    (player: TPlayerStatDetail) =>
                      player.team_id === team.team_id,
                  )
                  .toSorted(
                    (a: TPlayerStatDetail, b: TPlayerStatDetail) =>
                      a.player_order - b.player_order,
                  )
                  .map((player: TPlayerStatDetail) => (
                    <TableRow key={player.id}>
                      <TableCell align="center">{player.jersey_number}</TableCell>
                      <TableCell align="center">{player.player_position}</TableCell>
                      <TableCell align="center">
                        <TableFlag src={player.player_flag} alt="" />
                      </TableCell>
                      <TableCell sx={{ minWidth: 160 }}>
                        <LinkRoute
                          underline="hover"
                          to={`/players/${player.player_id}`}
                        >
                          {player.first_name} {player.last_name}
                        </LinkRoute>
                      </TableCell>
                      <TableCell align="center">{player.games}</TableCell>
                      <TableCell align="center">{player.goals}</TableCell>
                      <TableCell sx={{ minWidth: 160 }}>
                        {player.postseason}
                      </TableCell>
                      <TableCell align="center">
                        {player.season_id - player.birth_year}
                      </TableCell>
                      <TableCell align="center">{player.birth_year}</TableCell>
                      <TableCell align="center">{player.height}</TableCell>
                      <TableCell align="center">{player.weight}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </Paper>
  );
};

export default Players;
