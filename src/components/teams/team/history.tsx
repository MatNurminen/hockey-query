import { memo } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import HeaderSection from "../../common/Table/headerSection";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { StandingsResult } from "../../../api/teams-stats/hooks";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import SectionChapter from "../../common/Sections/sectionChapter";
import LinkRoute from "../../common/LinkRoute";

interface Props {
  title: string;
  teamId: number;
  leagues: StandingsResult[];
}

const History = ({ title, teamId, leagues }: Props) => {
  return (
    <Grid container spacing={2}>
      {leagues.map((league) => (
        <Grid size={12} key={league.id}>
          <SectionChapter content={`${title} ${league.name}`} />
          <TableContainer component={Paper}>
            <Table size="small">
              <HeaderSection
                cells={[
                  { text: "Season" },
                  { text: "League" },
                  { align: "center", text: "gp" },
                  { align: "center", text: "w" },
                  { align: "center", text: "t" },
                  { align: "center", text: "l" },
                  { align: "center", text: "gf" },
                  { align: "center", text: "ga" },
                  { align: "center", text: "+/-" },
                  { align: "center", text: "pts" },
                  { text: "Postseason" },
                ]}
              />
              <TableBody>
                {league.list
                  .toSorted((a, b) => b.season_id - a.season_id)
                  .map((team) => (
                    <TableRow key={team.id}>
                      <TableCell>
                        <LinkRoute
                          to={`/teams/${teamId}?season=${team.season_id}`}
                        >
                          {team.season}
                        </LinkRoute>
                      </TableCell>
                      <TableCell sx={{ minWidth: 160 }}>
                        <LinkRoute
                          to={`/leagues/${team.league_id}?season=${team.season_id}`}
                        >
                          {team.name}
                        </LinkRoute>
                      </TableCell>
                      <TableCell align="center">{team.games}</TableCell>
                      <TableCell align="center">{team.wins}</TableCell>
                      <TableCell align="center">{team.ties}</TableCell>
                      <TableCell align="center">{team.losts}</TableCell>
                      <TableCell align="center">{team.goals_for}</TableCell>
                      <TableCell align="center">{team.goals_against}</TableCell>
                      <TableCell align="center">{team.gd}</TableCell>
                      <TableCell align="center">{team.pts}</TableCell>
                      <TableCell sx={{ minWidth: 160 }}>
                        {team.postseason?.title}
                      </TableCell>
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
