import { memo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import HeaderSection from "../../common/Table/headerSection";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  useMultipleStandings,
  StandingsResult,
} from "../../../api/teams-stats/hooks";
import { TStandings } from "../../../api/teams-stats/types";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import SectionChapter from "../../common/Sections/sectionChapter";

interface Props {
  title: string;
  teamId: number;
}

const History = ({ title, teamId }: Props) => {
  const configs = [
    {
      id: 1,
      name: "History and Standings",
      params: {
        teamId,
        typeId: 1,
      },
    },
    {
      id: 2,
      name: "Tournament Statistics",
      params: {
        teamId,
        typeId: 3,
      },
    },
  ];

  const { data: leagues, isError, isLoading } = useMultipleStandings(configs);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;

  return (
    <Grid container spacing={2}>
      {leagues.map((league: StandingsResult) => (
        <Grid size={{ sm: 12 }} key={league.id}>
          <SectionChapter
            txtAlign={"left"}
            content={`${title} ${league.name}`}
          />
          <TableContainer component={Paper}>
            <Table size="small">
              <HeaderSection
                cells={[
                  { text: "Season", width: "6%" },
                  { text: "League", width: "24%" },
                  { align: "center", text: "gp", width: "5%" },
                  { align: "center", text: "w", width: "5%" },
                  { align: "center", text: "t", width: "5%" },
                  { align: "center", text: "l", width: "5%" },
                  { align: "center", text: "gf", width: "5%" },
                  { align: "center", text: "ga", width: "5%" },
                  { align: "center", text: "+/-", width: "5%" },
                  { align: "center", text: "pts", width: "5%" },
                  { text: "Postseason", width: "30%" },
                ]}
              />
              <TableBody>
                {league.list
                  .toSorted(
                    (a: TStandings, b: TStandings) => b.season_id - a.season_id,
                  )
                  .map((team: TStandings) => (
                    <TableRow key={team.id}>
                      <TableCell>{team.season}</TableCell>
                      <TableCell>{team.name}</TableCell>
                      <TableCell align="center">{team.games}</TableCell>
                      <TableCell align="center">{team.wins}</TableCell>
                      <TableCell align="center">{team.ties}</TableCell>
                      <TableCell align="center">{team.losts}</TableCell>
                      <TableCell align="center">{team.goals_for}</TableCell>
                      <TableCell align="center">{team.goals_against}</TableCell>
                      <TableCell align="center">{team.gd}</TableCell>
                      <TableCell align="center">{team.pts}</TableCell>
                      <TableCell>{team.postseason?.title}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(History);
