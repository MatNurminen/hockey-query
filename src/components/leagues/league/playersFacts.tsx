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
  return [...list]
    .sort((a, b) => {
      const difference = getValue(b) - getValue(a);
      return desc ? difference : -difference;
    })
    .slice(0, 5);
};

const getAge = (player: TPlayerStatDetail, seasonId: number) =>
  seasonId - player.birth_year;

type FactItem = {
  name: string;
  abr: string;
  desc: boolean;
  getValue: (player: TPlayerStatDetail, seasonId: number) => number;
};

const items: FactItem[] = [
  {
    name: "Oldest",
    abr: "yrs",
    desc: true,
    getValue: getAge,
  },
  {
    name: "Tallest",
    abr: "cm",
    desc: true,
    getValue: (player) => player.height,
  },
  {
    name: "Heaviest",
    abr: "kg",
    desc: true,
    getValue: (player) => player.weight,
  },
  {
    name: "Youngest",
    abr: "yrs",
    desc: false,
    getValue: getAge,
  },
  {
    name: "Shortest",
    abr: "cm",
    desc: false,
    getValue: (player) => player.height,
  },
  {
    name: "Lightest",
    abr: "kg",
    desc: false,
    getValue: (player) => player.weight,
  },
];

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

  return (
    <>
      <SectionChapter content={`${formatSeason(seasonId)} Interesting Facts`} />
      <Grid container>
        {items.map((item) => {
          const factPlayers = topN(
            players,
            (player) => item.getValue(player, seasonId),
            item.desc,
          );

          return (
            <Grid size={{ xs: 12, md: 4 }} key={item.name}>
              <TableContainer component={Paper}>
                <Table size="small">
                  <HeaderSection
                    cells={[
                      { text: "#" },
                      { text: item.name },
                      { text: "" },
                    ]}
                  />
                  <TableBody>
                    {factPlayers.map((player, index) => (
                      <TableRow key={player.id}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center">
                            <TableFlag alt="" src={player.player_flag} />
                            <LinkRoute
                              to={`/players/${player.player_id}`}
                              ml={1}
                            >
                              {player.first_name} {player.last_name} (
                              {player.player_position})
                            </LinkRoute>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          {item.getValue(player, seasonId)} {item.abr}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default memo(PlayersFacts);
