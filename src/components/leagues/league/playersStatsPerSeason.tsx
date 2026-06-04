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

const PlayersStatsPerSeason = ({ leagueId }: any) => {
  const configs = [
    {
      id: 1,
      name: 'forwards',
      params: {
        leagueId,
        playerOrd: [3],
        limit: 5,
      },
    },
    {
      id: 2,
      name: 'defenders',
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
    >
      {items.map((item: any) => (
        <Grid size={{ sm: 12, md: 6 }} key={item.name}>
          <TableContainer component={Paper}>
            <Table size="small">
              <HeaderMain
                cells={[`League all-time ${item.name} goals per season`]}
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
                {item.list.map((player: any, key: any) => (
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
          <Box mt={1}>
            <AppButton
              color="success"
              fullWidth={true}
              text="Show More"
              to=""
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default PlayersStatsPerSeason;
