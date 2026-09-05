import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import HeaderSection from "../../common/Table/headerSection";
import TableFlag from "../../common/Images/tableFlag";
import AppButton from "../../common/Buttons/appButton";
import {
  useMultiplePlayersStatsDetail,
  type MultipleStatsConfig,
} from "../../../api/players-stats/hooks";
import type { PlayersStatsDetailParams } from "../../../api/players-stats/types";
import { formatSeason } from "../../utils/formatSeason";
import { TPlayerStatDetail } from "../../../api/players-stats/types";
import LinkRoute from "../../common/LinkRoute";
import SectionChapter from "../../common/Sections/sectionChapter";

interface Props {
  nationId: number;
  natName: string;
}

const PlrsStatsSeason = ({ nationId, natName }: Props) => {
  const [searchParams] = useSearchParams();
  const seasonId = Number(searchParams.get("season"));

  const configs: MultipleStatsConfig<PlayersStatsDetailParams>[] = [
    {
      id: 1,
      name: "north america",
      params: {
        nationId,
        leagueId: [14, 15],
        seasonId,
        playerOrd: [2, 3],
        limit: 10,
      },
    },
    {
      id: 2,
      name: "europe",
      params: {
        nationId,
        excludeLeagueId: [14, 15],
        seasonId,
        typeId: 1,
        playerOrd: [2, 3],
        limit: 10,
      },
    },
  ];

  const {
    data: items,
    isLoading,
    isError,
  } = useMultiplePlayersStatsDetail(configs);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <h3>Error!</h3>;

  return (
    <>
      {items.map(
        (item: { id: number; name: string; list: TPlayerStatDetail[] }) => (
          <Box key={item.id}>
            <SectionChapter
              content={`${formatSeason(seasonId)} Players From ${natName} In ${
                item.name
              }`}
            />
            <TableContainer component={Paper}>
              <Table size="small">
                <HeaderSection
                  cells={[
                    { align: "center", text: "#" },
                    { text: "Player" },
                    { text: "Team" },
                    { text: "League" },
                    { align: "center", text: "GP" },
                    { align: "center", text: "G" },
                  ]}
                />
                <TableBody>
                  {item.list.map((player: TPlayerStatDetail, index: number) => (
                    <TableRow key={player.player_id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell sx={{ minWidth: 160 }}>
                        <Box display="flex" alignItems="center">
                          <TableFlag alt="" src={player.player_flag} />
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
                      <TableCell sx={{ minWidth: 160 }}>
                        <Box display="flex" alignItems="center">
                          <TableFlag alt="" src={player.team_flag} />
                          <LinkRoute
                            underline="hover"
                            to={`/teams/${player.team_id}`}
                            ml={1}
                          >
                            {player.full_name}
                          </LinkRoute>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <LinkRoute
                          underline="hover"
                          to={`/leagues/${player.league_id}`}
                          ml={1}
                        >
                          {player.short_name}
                        </LinkRoute>
                      </TableCell>
                      <TableCell align="center">{player.games}</TableCell>
                      <TableCell align="center">{player.goals}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <AppButton
              color="success"
              fullWidth={true}
              text="Show more"
              to={`/nation?nation=${nationId}&season=${seasonId}`}
              sx={{ mb: 2 }}
            />
          </Box>
        ),
      )}
    </>
  );
};

export default memo(PlrsStatsSeason);
