import Box from "@mui/material/Box";
import HeaderSection from "../../common/Table/headerSection";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Grid2";
import TableFlag from "../../common/Images/tableFlag";
import { getPlayersStatsDetail } from "../../../api/players-stats/queries";
import { TPlayerStatDetail } from "../../../api/players-stats/types";
import { formatSeason } from "../../utils/formatSeason";
import SectionChapter from "../../common/Sections/sectionChapter";
import LinkRoute from "../../common/LinkRoute";
import { memo } from "react";

interface Props {
  leagueId: number;
  seasonId: number;
}

const topN = (
  list: TPlayerStatDetail[],
  getValue: (player: TPlayerStatDetail) => number,
  desc: boolean,
) => {
  const direction = desc ? 1 : -1;
  return [...list]
    .sort((a, b) => direction * (getValue(b) - getValue(a)))
    .slice(0, 5);
};

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
  if (players.length === 0) return <h3>No data available</h3>;

  const ageOf = (player: TPlayerStatDetail) => seasonId - player.birth_year;

  const items: {
    column: "age" | "height" | "weight";
    list: (players: TPlayerStatDetail[]) => TPlayerStatDetail[];
    name: string;
    abr: string;
  }[] = [
    {
      column: "age",
      list: (p) => topN(p, ageOf, true),
      name: "Oldest",
      abr: "yrs",
    },
    {
      column: "height",
      list: (p) => topN(p, (x) => x.height, true),
      name: "Tallest",
      abr: "cm",
    },
    {
      column: "weight",
      list: (p) => topN(p, (x) => x.weight, true),
      name: "Heaviest",
      abr: "kg",
    },
    {
      column: "age",
      list: (p) => topN(p, ageOf, false),
      name: "Youngest",
      abr: "yrs",
    },
    {
      column: "height",
      list: (p) => topN(p, (x) => x.height, false),
      name: "Shortest",
      abr: "cm",
    },
    {
      column: "weight",
      list: (p) => topN(p, (x) => x.weight, false),
      name: "Lightest",
      abr: "kg",
    },
  ];

  return (
    <>
      <SectionChapter content={`${formatSeason(seasonId)} Interesting Facts`} />
      <Grid container>
        {items.map((item) => (
          <Grid size={{ xs: 12, md: 4 }} key={item.name}>
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
                    <TableRow key={`${player.player_id}`}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <TableFlag alt="" src={player.player_flag} />
                          <LinkRoute to={`/players/${player.player_id}`} ml={1}>
                            {player.first_name} {player.last_name} (
                            {player.player_position})
                          </LinkRoute>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        {item.column === "age"
                          ? ageOf(player)
                          : player[item.column]}{" "}
                        {item.abr}
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

export default memo(PlayersFacts);
