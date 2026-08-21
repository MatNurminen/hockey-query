import { memo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { getTeamFacts } from "../../../api/teams-stats/queries";
import HeaderSection from "../../common/Table/headerSection";
import LinkRoute from "../../common/LinkRoute";
import SectionChapter from "../../common/Sections/sectionChapter";
import TableFlag from "../../common/Images/tableFlag";
import { formatSeason } from "../../utils/formatSeason";

interface Props {
  leagueId: number;
  seasonId: number;
  title: string;
}

const CompareTeams = ({ leagueId, seasonId, title }: Props) => {
  const { data, isError, isLoading } = getTeamFacts(leagueId, seasonId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data || data.length === 0) return null;

  return (
    <Stack sx={{ width: "100%" }}>
      <SectionChapter
        content={`${formatSeason(seasonId)} ${title} Team Comparison`}
      />
      <TableContainer component={Paper}>
        <Table size="small">
          <HeaderSection
            cells={[
              { align: "center", text: "#" },
              { text: "team" },
              { align: "center", text: "players" },
              { align: "center", text: "avg height" },
              { align: "center", text: "avg weight" },
              { align: "center", text: "avg age" },
            ]}
          />
          <TableBody>
            {data.map((team, index) => (
              <TableRow key={team.team_id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell sx={{ minWidth: 180 }}>
                  <Box display="flex" alignItems="center">
                    <TableFlag alt="" src={team.logo} />
                    <LinkRoute to={`/teams/${team.team_id}`} ml={1}>
                      {team.full_name}
                    </LinkRoute>
                  </Box>
                </TableCell>
                <TableCell align="center">{team.plrs}</TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>
                  {team.avheight} cm
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 100 }}>
                  {team.avweight} kg
                </TableCell>
                <TableCell align="center" sx={{ minWidth: 70 }}>
                  {team.avage}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default memo(CompareTeams);
