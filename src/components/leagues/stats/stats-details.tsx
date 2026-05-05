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
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import SelectSeason from "../../common/Selects/selectSeason";
import { TPlayerStatDetail } from "../../../api/players-stats/types";

interface Props {
  season: string;
  players: TPlayerStatDetail[];
}

const StatsDetails = memo(({ season, players }: Props) => {
  return (
    <>
      <Paper>
        <TableContainer>
          <Table size="small">
            <HeaderMain cells={[`${season} Player Stats`]} />
          </Table>
          <Box sx={{ p: 2 }}>
            <SelectSeason />
          </Box>
          <Table size="small">
            <HeaderSection
              cells={[
                { align: "center", text: "#" },
                { text: "player" },
                { align: "center", text: "age" },
                { text: "team" },
                { align: "center", text: "gp" },
                { align: "center", text: "g" },
                { text: "Postseason" },
              ]}
            />
            <TableBody>
              {players.map((player, key) => (
                // may by to do key more...
                <TableRow key={player.player_id}>
                  <TableCell align="center">{key + 1}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <TableFlag alt="" src={player.player_flag} />
                      <Link
                        underline="hover"
                        component={RouterLink}
                        to={`/players/${player.player_id}`}
                        ml={1}
                      >
                        {player.first_name} {player.last_name} (
                        {player.player_position})
                      </Link>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {player.season_id - player.birth_year}
                  </TableCell>
                  <TableCell>
                    <Link
                      underline="hover"
                      component={RouterLink}
                      to={`/teams/${player.team_id}`}
                      ml={1}
                    >
                      {player.club_name}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{player.games}</TableCell>
                  <TableCell align="center">{player.goals}</TableCell>
                  <TableCell>{player.postseason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
});

export default StatsDetails;
