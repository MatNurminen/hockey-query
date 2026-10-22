import { memo } from "react";
import SectionChapter from "../../../common/Sections/sectionChapter";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import HeaderSection from "../../../common/Table/headerSection";
import TableBody from "@mui/material/TableBody";
import { AwardStatsDetails } from "../../../../api/awards/types";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import LinkRoute from "../../../common/LinkRoute";
import { formatSeason } from "../../../utils/formatSeason";
import Box from "@mui/material/Box";
import TableFlag from "../../../common/Images/tableFlag";
import Pagination from "../../../common/Pagination/pagination";

interface Props {
  players: AwardStatsDetails[];
  offset: number;
  limit: number;
  total: number;
  onPageChange: (offset: number) => void;
}

const AwardsDetails = ({
  players,
  offset,
  limit,
  total,
  onPageChange,
}: Props) => {
  return (
    <Box mt={6}>
      <SectionChapter content="All Winners (Players)" txtAlign="left" />
      <TableContainer component={Paper}>
        <Table size="small">
          <HeaderSection
            cells={[
              { align: "center", text: "Season" },
              { text: "Award Winner" },
              { align: "center", text: "Born" },
              { text: "Team" },
            ]}
          />
          <TableBody>
            {players.map((player, key) => (
              <TableRow key={key}>
                <TableCell align="center">
                  {formatSeason(player.season_id)}
                </TableCell>
                <TableCell sx={{ minWidth: 160 }}>
                  <Box display="flex" alignItems="center">
                    <TableFlag alt="" src={player.flag} />
                    <LinkRoute to={`/players/${player.player_id}`} ml={1}>
                      {player.first_name} {player.last_name} (
                      {player.player_position})
                    </LinkRoute>
                  </Box>
                </TableCell>
                <TableCell align="center">{player.birth_year}</TableCell>
                <TableCell sx={{ minWidth: 160 }}>
                  <LinkRoute
                    to={`/teams/${player.team_id}?season=${player.season_id}`}
                  >
                    {player.full_name}
                  </LinkRoute>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        offset={offset}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
      />
    </Box>
  );
};

export default memo(AwardsDetails);
