import { memo } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import HeaderSection from "../../common/Table/headerSection";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import { TPlayerStatDetail } from "../../../api/players-stats/types";
import LinkRoute from "../../common/LinkRoute";
import SectionChapter from "../../common/Sections/sectionChapter";

interface Props {
  seasons: TPlayerStatDetail[];
  offset: number;
}

const StatsSeason = memo(({ seasons, offset }: Props) => {
  return (
    <>
      <Paper>
        <SectionChapter content={`All-time Season Player Stats`} />
        <TableContainer>
          <Table size="small">
            <HeaderSection
              cells={[
                { align: "center", text: "#" },
                { text: "player" },
                { align: "center", text: "season" },
                { align: "center", text: "age" },
                { text: "team" },
                { align: "center", text: "gp" },
                { align: "center", text: "g" },
                { text: "Postseason" },
              ]}
            />
            <TableBody>
              {seasons.map((player, key) => (
                <TableRow
                  key={`${player.player_id}-${player.season_id}-${player.team_id}`}
                >
                  <TableCell align="center">{offset + key + 1}</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>
                    <Box display="flex" alignItems="center">
                      <TableFlag alt="" src={player.player_flag} />
                      <LinkRoute to={`/players/${player.player_id}`} ml={1}>
                        {player.first_name} {player.last_name} (
                        {player.player_position})
                      </LinkRoute>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{player.name}</TableCell>
                  <TableCell align="center">
                    {player.season_id - player.birth_year}
                  </TableCell>
                  <TableCell sx={{ minWidth: 160 }}>
                    <LinkRoute to={`/teams/${player.team_id}`} ml={1}>
                      {player.full_name}
                    </LinkRoute>
                  </TableCell>
                  <TableCell align="center">{player.games}</TableCell>
                  <TableCell align="center">{player.goals}</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>
                    {player.postseason}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
});

export default StatsSeason;
