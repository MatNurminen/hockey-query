import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import HeaderSection from "../../common/Table/headerSection";
import TableFlag from "../../common/Images/tableFlag";
import { getFreeAgents } from "../../../api/players/queries";
import SectionChapter from "../../common/Sections/sectionChapter";
import { TFreeAgentDto } from "../../../api/players/types";
import Paper from "@mui/material/Paper";
import LinkRoute from "../../common/LinkRoute";
import { memo } from "react";

interface Props {
  seasonId: number;
  nationId: number;
}

const Players = ({ seasonId, nationId }: Props) => {
  const {
    data: players,
    isError,
    isLoading,
  } = getFreeAgents(seasonId, nationId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!players) return <h3>No data available</h3>;

  return (
    <>
      <SectionChapter content="Free agents" txtAlign="left" />
      <TableContainer component={Paper}>
        <Table size="small">
          <HeaderSection
            cells={[
              { align: "center", text: "Pos" },
              { align: "center", text: "#" },
              { text: "Name" },
              { align: "center", text: "Nat" },
              { align: "center", text: "Age" },
              { align: "center", text: "Born" },
              { align: "center", text: "Height" },
              { align: "center", text: "Weight" },
            ]}
          />
          <TableBody>
            {players.map((player: TFreeAgentDto) => (
              <TableRow key={player.id}>
                <TableCell align="center">{player.player_position}</TableCell>
                <TableCell align="center">{player.jersey_number}</TableCell>
                <TableCell sx={{ minWidth: 160 }}>
                  <LinkRoute
                    underline="hover"
                    to={`/players/${player.id}`}
                  >
                    {player.first_name} {player.last_name}
                  </LinkRoute>
                </TableCell>
                <TableCell align="center">
                  <TableFlag alt="flag" src={player.flag} />
                </TableCell>
                <TableCell align="center">
                  {seasonId - player.birth_year}
                </TableCell>
                <TableCell align="center">{player.birth_year}</TableCell>
                <TableCell align="center">{player.height}</TableCell>
                <TableCell align="center">{player.weight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(Players);
