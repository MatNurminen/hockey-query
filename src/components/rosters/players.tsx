import HeaderMain from "../common/Table/headerMain";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import TableFlag from "../common/Images/tableFlag";
import ClubHeader from "./clubHeader";
import { TStandings } from "../../api/teams-stats/types";
import { TPlayerStatDetail } from "../../api/players-stats/types";
import { useMemo } from "react";
import { Cell } from "../common/Table/types";

interface Props {
  players: TPlayerStatDetail[];
  teams: TStandings[];
}

const columns: Cell[] = [
  { text: "#", align: "center" },
  { text: "Pos", align: "center" },
  { text: "Nat", align: "center" },
  { text: "Name", align: "left" },
  { text: "GP", align: "center" },
  { text: "G", align: "center" },
  { text: "Postseason", align: "left" },
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
    <TableContainer component={Paper}>
      {sortedTeams.map((team: TStandings) => (
        <div key={team.id}>
          <ClubHeader team={team.full_name} logo={team.logo} />
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
