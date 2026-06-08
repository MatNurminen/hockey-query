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
import TableFlag from "../../common/Images/tableFlag";
import { getPlayersStatsDetail } from "../../../api/players-stats/queries";
import { TPlayerStatDetail } from "../../../api/players-stats/types";

interface Props {
  leagueId: number;
  seasonId: number;
}

const PlayersFacts = ({ leagueId, seasonId }: Props) => {
  const {
    data: playersResponse,
    isLoading,
    isError,
  } = getPlayersStatsDetail({
    leagueId: [leagueId],
    seasonId,
  });
  const players = playersResponse?.data ?? [];

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!players) return <div>No data available</div>;

  const oldest = (players: TPlayerStatDetail[]) => {
    return players
      .map((item) => ({
        ...item,
        age: seasonId - item.birth_year,
      }))
      .sort((b, a) => a.age - b.age)
      .slice(0, 5);
  };

  const youngest = (players: TPlayerStatDetail[]) => {
    return players
      .map((item) => ({
        ...item,
        age: seasonId - item.birth_year,
      }))
      .sort((a, b) => a.age - b.age)
      .slice(0, 5);
  };

  const tallest = (players: TPlayerStatDetail[]) => {
    return [...players].sort((b, a) => a.height - b.height).slice(0, 5);
  };

  const shortest = (players: TPlayerStatDetail[]) => {
    return [...players].sort((a, b) => a.height - b.height).slice(0, 5);
  };

  const heaviest = (players: TPlayerStatDetail[]) => {
    return [...players].sort((b, a) => a.weight - b.weight).slice(0, 5);
  };

  const lightest = (players: TPlayerStatDetail[]) => {
    return [...players].sort((a, b) => a.weight - b.weight).slice(0, 5);
  };

  const items: {
    column: "age" | "height" | "weight";
    list: (
      players: TPlayerStatDetail[],
    ) => (TPlayerStatDetail & { age?: number })[];
    name: string;
    abr: string;
  }[] = [
    { column: "age", list: oldest, name: "Oldest", abr: "yrs" },
    { column: "height", list: tallest, name: "Tallest", abr: "cm" },
    { column: "weight", list: heaviest, name: "Heaviest", abr: "kg" },
    { column: "age", list: youngest, name: "Youngest", abr: "yrs" },
    { column: "height", list: shortest, name: "Shortest", abr: "cm" },
    { column: "weight", list: lightest, name: "Lightest", abr: "kg" },
  ];

  return (
    <>
      <Table size="small">
        <HeaderMain
          cells={[`${seasonId}-${seasonId - 1999} Interesting Facts`]}
        />
      </Table>
      <Grid container>
        {items.map((item) => (
          <Grid size={{ sm: 12, md: 4 }} key={item.name}>
            <TableContainer component={Paper}>
              <Table size="small">
                <HeaderSection
                  cells={[
                    { text: "#" },
                    { text: `${item.name}` },
                    { text: "" },
                  ]}
                />
                <TableBody>
                  {item.list(players).map((player, index) => (
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
                      <TableCell align="center">
                        {player[item.column]} {item.abr}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PlayersFacts;
