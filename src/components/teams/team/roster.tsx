import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import HeaderSection from "../../common/Table/headerSection";
import HeaderPosition from "../../common/Table/headerPosition";
import { getPlayersStatsDetail } from "../../../api/players-stats/queries";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableFlag from "../../common/Images/tableFlag";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import FooterSection from "../../common/Table/footerSection";
import { formatSeason } from "../../utils/formatSeason";
import SectionChapter from "../../common/Sections/sectionChapter";
import { TPlayerStatDetail } from "../../../api/players-stats/types";
import { Fragment, memo } from "react";

interface Props {
  seasonId: number;
  title: string;
  players: TPlayerStatDetail[];
}

const Roster = ({ seasonId, title, players }: Props) => {
  const pos = ["GOALTENDERS", "DEFENSEMEN", "FORWARDS"];

  const players_by_pos = (_player: TPlayerStatDetail[], pos: number) => {
    return players.filter((pl) => pl.player_order === pos);
  };

  const goaltenders = players_by_pos(players, 1);
  const defensemen = players_by_pos(players, 2);
  const forwards = players_by_pos(players, 3);

  const calcAverage = (players: TPlayerStatDetail[]) => {
    const totalPlayers = players.length || 1;
    const totalAge = players.reduce(
      (sum, player) => sum + (player.season_id - player.birth_year),
      0,
    );
    const totalHeight = players.reduce((sum, player) => sum + player.height, 0);
    const totalWeight = players.reduce((sum, player) => sum + player.weight, 0);

    const averageAge = totalAge / totalPlayers;
    const averageHeight = totalHeight / totalPlayers;
    const averageWeight = totalWeight / totalPlayers;

    return {
      averageAge,
      averageHeight,
      averageWeight,
    };
  };

  const { averageAge, averageHeight, averageWeight } = calcAverage(players);

  return (
    <>
      <SectionChapter content={`${formatSeason(seasonId)} ${title} Roster`} />
      <TableContainer>
        <Table size="small">
          <HeaderSection
            cells={[
              { align: "center", text: "#" },
              { align: "center", text: "N" },
              { text: "player" },
              { align: "center", text: "gp" },
              { align: "center", text: "g" },
              { text: "Postseason" },
              { align: "center", text: "a" },
              { align: "center", text: "born" },
              { align: "center", text: "ht" },
              { align: "center", text: "wt" },
            ]}
          />
          <TableBody>
            {pos.map((p, p_key) => (
              <Fragment key={p}>
                <HeaderPosition row cells={[p]} colSpan={10} />
                {players_by_pos(players, p_key + 1).map((player) => (
                  <TableRow key={player.id}>
                    <TableCell align="center">{player.jersey_number}</TableCell>
                    <TableCell align="center">
                      <TableFlag src={player.player_flag} alt="" />
                    </TableCell>
                    <TableCell sx={{ minWidth: 160 }}>
                      <Link
                        underline="hover"
                        component={RouterLink}
                        to={`/players/${player.player_id}`}
                      >
                        {player.first_name} {player.last_name} (
                        {player.player_position})
                      </Link>
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
              </Fragment>
            ))}
          </TableBody>
          <FooterSection
            cells={[
              {
                align: "center",
                colSpan: 10,
                text: `Position: G: ${goaltenders.length}, D: ${
                  defensemen.length
                }, F: ${forwards.length} | 
              Av Age: ${averageAge.toFixed(2)} years | 
              Av Ht: ${averageHeight.toFixed(2)} cm | 
              Av Wt: ${averageWeight.toFixed(2)} kg`,
              },
            ]}
          />
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(Roster);
