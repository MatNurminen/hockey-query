import TableContainer from "@mui/material/TableContainer";
import {
  getPlayersStatsLeagues,
  getPlayersStatsTeams,
} from "../../../api/players-stats/queries";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import HeaderSection from "../../common/Table/headerSection";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import SectionChapter from "../../common/Sections/sectionChapter";
import { memo } from "react";

interface Props {
  playerName: string;
  playerId: number;
}

interface StatDisplay {
  league_id?: number;
  team_id?: number;
  logo?: string;
  flag?: string;
  short_name?: string;
  full_name?: string;
  years: number;
  games_t: number;
  goals_t: number;
}

interface StatItemGroup {
  id: number;
  title: string;
  data: StatDisplay[];
}

const StatsTotal = ({ playerName, playerId }: Props) => {
  const {
    data: leagues,
    isLoading: loadLeagues,
    isError: errLeagues,
  } = getPlayersStatsLeagues(playerId);

  const {
    data: teams,
    isLoading: loadTeams,
    isError: errTeams,
  } = getPlayersStatsTeams(playerId);

  if (loadLeagues || loadTeams) return <p>Loading...</p>;
  if (errLeagues || errTeams) return <p>Error</p>;
  if (!leagues || !teams) return <div>No data available</div>;

  const items: StatItemGroup[] = [
    { id: 1, title: "league", data: leagues },
    { id: 2, title: "team", data: teams },
  ];

  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid size={{ sm: 12, md: 6 }} key={item.id}>
          <SectionChapter
            content={`${playerName} Career Totals Per ${item.title}`}
            txtAlign="left"
          />
          <TableContainer component={Paper}>
            <Table size="small">
              <HeaderSection
                cells={[
                  { text: item.title },
                  { align: "center", text: "Years" },
                  { align: "center", text: "GP" },
                  { align: "center", text: "G" },
                  { align: "center", text: "PPG" },
                ]}
              />
              <TableBody>
                {item.data.map((stat: StatDisplay) => (
                  <TableRow key={stat.league_id || stat.team_id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <TableFlag
                          alt="flag"
                          src={stat.logo || stat.flag || ""}
                        />
                        <Link
                          underline="hover"
                          component={RouterLink}
                          to={
                            stat.league_id
                              ? `/leagues/${stat.league_id}`
                              : `/teams/${stat.team_id}`
                          }
                          ml={1}
                        >
                          {stat.short_name || stat.full_name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{stat.years}</TableCell>
                    <TableCell align="center">{stat.games_t}</TableCell>
                    <TableCell align="center">{stat.goals_t}</TableCell>
                    <TableCell align="center">
                      {(stat.goals_t / stat.games_t || 0).toFixed(1)}
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

export default memo(StatsTotal);
