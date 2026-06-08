import Box from "@mui/material/Box";
import HeaderMain from "../../common/Table/headerMain";
import HeaderSection from "../../common/Table/headerSection";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import AppButton from "../../common/Buttons/appButton";
import TableFlag from "../../common/Images/tableFlag";
import { useMultiplePlayersStatsDetail } from "../../../api/players-stats/hooks";
import { TPlayerStatDetail } from "../../../api/players-stats/types";

interface Props {
  leagueId: number;
  seasonId: number;
}

const PlayersStatsPerSeason = ({ leagueId, seasonId }: Props) => {
  const configs = [
    {
      id: 3,
      name: "forwards",
      params: {
        leagueId,
        playerOrd: [3],
        limit: 5,
      },
    },
    {
      id: 2,
      name: "defenders",
      params: {
        leagueId,
        playerOrd: [2],
        limit: 5,
      },
    },
  ];

  const {
    data: items,
    isLoading,
    isError,
  } = useMultiplePlayersStatsDetail(configs);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      {items.map((item: { id: number; name: string; list: TPlayerStatDetail[] }) => (
        <Grid size={{ sm: 12, md: 6 }} key={item.name}>
          <TableContainer component={Paper}>
            <Table size="small">
              <HeaderMain
                cells={[`League all-time ${item.name} stats per season`]}
              />
            </Table>
            <Table size="small">
              <HeaderSection
                cells={[
                  { align: "center", text: "#" },
                  { text: "Player" },
                  { text: "Season" },
                  { text: "Team" },
                  { align: "center", text: "gp" },
                  { align: "center", text: "g" },
                ]}
              />
              <TableBody>
                {item.list.map((player, index) => (
                  <TableRow key={player.player_id}>
                    <TableCell align="center">{index + 1}</TableCell>
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
                    <TableCell align="center">{player.name}</TableCell>
                    <TableCell>
                      <Link
                        underline="hover"
                        component={RouterLink}
                        to={`/teams/${player.team_id}`}
                        ml={1}
                      >
                        {player.full_name}
                      </Link>
                    </TableCell>
                    <TableCell align="center">{player.games}</TableCell>
                    <TableCell align="center">{player.goals}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AppButton color="success" fullWidth={true} text="Show More" to={`/league-stats?league=${leagueId}&season=${seasonId}&playerOrd=${item.id}&tab=three`} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PlayersStatsPerSeason;
