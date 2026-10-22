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

interface Props {
  players: AwardStatsDetails[];
}

const AwardsDetails = ({ players }: Props) => {
  return (
    <>
      <SectionChapter content="All Winners (Players)" txtAlign="left" />
      <TableContainer component={Paper}>
        <Table size="small">
          <HeaderSection
            cells={[
              { align: "center", text: "Season" },
              { text: "Award Winner" },
              { align: "center", text: "Born" },
            ]}
          />
          <TableBody>
            {players.map((player: any, key) => (
              <TableRow key={key}>
                <TableCell align="center">
                  {formatSeason(player.season_id)}
                </TableCell>
                <TableCell sx={{ minWidth: 160 }}>
                  <LinkRoute
                    underline="hover"
                    //to={`/players/${player.id}`}
                    to="/"
                  >
                    {player.first_name} {player.last_name} (
                    {player.player_position})
                  </LinkRoute>
                </TableCell>
                <TableCell align="center">{player.birth_year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(AwardsDetails);
