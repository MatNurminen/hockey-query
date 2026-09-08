import Box from "@mui/material/Box";
import HeaderSection from "../../common/Table/headerSection";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid2";
import AppButton from "../../common/Buttons/appButton";
import TableFlag from "../../common/Images/tableFlag";
import { getPlayersStatsTotal } from "../../../api/players-stats/queries";
import { TPlayerStatTotal } from "../../../api/players-stats/types";
import SectionChapter from "../../common/Sections/sectionChapter";
import { memo } from "react";
import LinkRoute from "../../common/LinkRoute";

interface Props {
  teamId: number;
}

const PlayersStatsTotal = ({ teamId }: Props) => {
  const { data, isLoading, isError } = getPlayersStatsTotal({ teamId });

  const players = data?.data;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!players) return <div>No data available</div>;

  const goaltendings = () => {
    return players
      .filter((f) => f.player_order === 1)
      .toSorted((a, b) => b.goals_t - a.goals_t)
      .slice(0, 5);
  };

  const defensemen = () => {
    return players
      .filter((f) => f.player_order === 2)
      .toSorted((a, b) => b.goals_t - a.goals_t)
      .slice(0, 5);
  };

  const forwards = () => {
    return players
      .filter((f) => f.player_order === 3)
      .toSorted((a, b) => b.goals_t - a.goals_t)
      .slice(0, 5);
  };

  const items: {
    sort: number;
    list: (players: TPlayerStatTotal[]) => TPlayerStatTotal[];
    name: string;
  }[] = [
    { sort: 3, list: forwards, name: "forwards" },
    { sort: 2, list: defensemen, name: "defensemen" },
    { sort: 1, list: goaltendings, name: "goaltendings" },
  ];

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      {items.map((item) => (
        <Grid size={{ xs: 12, md: 4 }} key={item.name}>
          <SectionChapter content={`Franchise all-time ${item.name} Stats`} />
          <TableContainer component={Paper}>
            <Table size="small">
              <HeaderSection
                cells={[
                  { align: "center", text: "#" },
                  { text: "Player" },
                  { align: "center", text: "gp" },
                  { align: "center", text: "g" },
                ]}
              />
              <TableBody>
                {item.list(players).map((player, index) => (
                  <TableRow key={player.player_id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <TableFlag src={player.player_flag} alt="" />
                        <LinkRoute
                          underline="hover"
                          to={`/players/${player.player_id}`}
                          ml={1}
                        >
                          {player.first_name} {player.last_name} (
                          {player.player_position})
                        </LinkRoute>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{player.games_t}</TableCell>
                    <TableCell align="center">{player.goals_t}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AppButton
            fullWidth={true}
            text="Show More"
            color="success"
            //to={`/league-stats?league=${leagueId}&season=${seasonId}&playerOrd=${item.id}&tab=three`}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default memo(PlayersStatsTotal);
