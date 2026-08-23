import { memo } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import HeaderMain from "../../common/Table/headerMain";
import HeaderSection from "../../common/Table/headerSection";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import { TPlayerStatByClub } from "../../../api/players-stats/types";
import LinkRoute from "../../common/LinkRoute";

interface Props {
  totalteams: TPlayerStatByClub[];
  offset: number;
}

const StatsTeam = memo(({ totalteams, offset }: Props) => {
  return (
    <>
      <Paper>
        <TableContainer>
          <Table size="small">
            <HeaderMain cells={[`All-time totals Player Stats`]} />
          </Table>
          <Table size="small">
            <HeaderSection
              cells={[
                { align: "center", text: "#" },
                { text: "player" },
                { text: "team" },
                { align: "center", text: "gp" },
                { align: "center", text: "g" },
                { align: "center", text: "years" },
              ]}
            />
            <TableBody>
              {totalteams.map((player, key) => (
                <TableRow key={`${player.player_id}-${player.team_id}`}>
                  <TableCell align="center">{offset + key + 1}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <TableFlag alt="" src={player.player_flag} />
                      <LinkRoute to={`/players/${player.player_id}`} ml={1}>
                        {player.first_name} {player.last_name} (
                        {player.player_position})
                      </LinkRoute>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <LinkRoute to={`/teams/${player.team_id}`} ml={1}>
                      {player.full_name}
                    </LinkRoute>
                  </TableCell>
                  <TableCell align="center">{player.games_t}</TableCell>
                  <TableCell align="center">{player.goals_t}</TableCell>
                  <TableCell align="center">{player.years}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
});

export default StatsTeam;
