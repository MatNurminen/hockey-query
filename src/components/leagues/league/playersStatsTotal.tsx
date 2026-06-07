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
import { useMultiplePlayersStatsTotal } from "../../../api/players-stats/hooks";
import { TPlayerStatTotal } from "../../../api/players-stats/types";

interface Props {
  leagueId: number;
  seasonId: number;
}

const PlayersStatsTotal = ({ leagueId, seasonId }: Props) => {
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
    {
      id: 1,
      name: "goaltending",
      params: {
        leagueId,
        playerOrd: [1],
        limit: 5,
      },
    },
  ];

  const {
    data: items,
    isLoading,
    isError,
  } = useMultiplePlayersStatsTotal(configs);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <Grid container direction="row" justifyContent="center" spacing={2}>
      {items.map(
        (item: { id: number; name: string; list: TPlayerStatTotal[] }) => (
          <Grid size={{ sm: 12, md: 4 }} key={item.id}>
            <TableContainer component={Paper}>
              <Table size="small">
                <HeaderMain cells={[`League all-time ${item.name} Stats`]} />
              </Table>
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
                  {item.list.map((player, key) => (
                    <TableRow key={key}>
                      <TableCell align="center">{key + 1}</TableCell>
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
                      <TableCell align="center">{player.games_t}</TableCell>
                      <TableCell align="center">{player.goals_t}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <AppButton
              color="success"
              fullWidth={true}
              text="Show More"
              to={`/league-stats?league=${leagueId}&season=${seasonId}&playerOrd=${item.id}&tab=two`}
            />
          </Grid>
        ),
      )}
    </Grid>
  );
};

export default PlayersStatsTotal;
