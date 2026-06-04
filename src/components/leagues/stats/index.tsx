import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Header from "./header";
import Selects from "./selects";
import { useSearchParams } from "react-router-dom";
import StatsTabs from "./stats-tabs";
import {
  getPlayersStatsDetail,
  getPlayersStatsTotal,
  getPlayersStatsTotalByTeam,
} from "../../../api/players-stats/queries";
import SelectSeason from "../../common/Selects/selectSeason";
import { useRef, useState } from "react";

const LIMIT = 50;

const PlayersStats = () => {
  const [searchParams] = useSearchParams();
  const leagueId = Number(searchParams.get("league"));
  const seasonId = Number(searchParams.get("season"));
  const playerOrd = searchParams.get("playerOrd")
    ? [Number(searchParams.get("playerOrd"))]
    : undefined;
  const teamId = Number(searchParams.get("teamId")) || undefined;
  const nationId = Number(searchParams.get("nationId")) || undefined;
  const offset = Number(searchParams.get("offset")) || 0;

  const [selectsData, setSelectsData] = useState<any[]>([]);

  const detailParams = {
    leagueId: [leagueId],
    seasonId,
    playerOrd,
    teamId,
    nationId,
    limit: LIMIT,
    offset,
  };
  const totalParams = {
    leagueId,
    playerOrd,
    teamId,
    nationId,
    limit: LIMIT,
    offset,
  };
  const seasonParams = {
    leagueId: [leagueId],
    playerOrd,
    teamId,
    nationId,
    limit: LIMIT,
    offset,
  };
  const totalByTeamParams = {
    leagueId,
    playerOrd,
    teamId,
    nationId,
    limit: LIMIT,
    offset,
  };

  const {
    data: playersResponse,
    isLoading: isLoadingDetail,
    isFetching: isFetchingDetail,
    isError: isErrorDetail,
  } = getPlayersStatsDetail(detailParams);

  const {
    data: totalsResponse,
    isLoading: isLoadingTotal,
    isFetching: isFetchingTotal,
    isError: isErrorTotal,
  } = getPlayersStatsTotal(totalParams);

  const {
    data: seasonsResponse,
    isLoading: isLoadingSeasons,
    isFetching: isFetchingSeasons,
    isError: isErrorSeasons,
  } = getPlayersStatsDetail(seasonParams);

  const {
    data: totalteamsResponse,
    isLoading: isLoadingTotalTeam,
    isFetching: isFetchingTotalTeam,
    isError: isErrorTotalTeam,
  } = getPlayersStatsTotalByTeam(totalByTeamParams);

  const players = playersResponse?.data ?? [];
  const totals = totalsResponse?.data ?? [];
  const seasons = seasonsResponse?.data ?? [];
  const totalteams = totalteamsResponse?.data ?? [];

  const totalDetail = playersResponse?.total ?? 0;
  const totalStats = totalsResponse?.total ?? 0;
  const totalSeasons = seasonsResponse?.total ?? 0;
  const totalTeams = totalteamsResponse?.total ?? 0;

  const seasonParam = searchParams.get("season") || "";
  const lastSeasonRef = useRef(seasonParam);

  if (seasonParam) {
    lastSeasonRef.current = seasonParam;
  }
  const hasData =
    players.length ||
    totals.length ||
    seasons.length ||
    totalteams.length ||
    isFetchingDetail ||
    isFetchingTotal ||
    isFetchingSeasons ||
    isFetchingTotalTeam;

  const league = players[0]?.short_name || "";

  if (isErrorDetail || isErrorTotal || isErrorSeasons || isErrorTotalTeam)
    return <h3>Error!</h3>;

  const handleDataChange = (data: any[]) => {
    setSelectsData(data);
  };

  return (
    <Container sx={{ py: 1, mt: 2, mb: 10 }}>
      <Paper sx={{ px: 2, pb: 1 }}>
        <Header league={league} leagueId={leagueId} seasonId={seasonId} />
      </Paper>
      {seasonId && seasonId > 0 ? (
        <Paper sx={{ mt: 2, p: 2 }}>
          <SelectSeason />
        </Paper>
      ) : null}
      {isLoadingDetail ||
      isLoadingTotal ||
      isLoadingSeasons ||
      isLoadingTotalTeam ? (
        <Paper sx={{ mt: 2, p: 2 }}>
          <p>Loading...</p>
        </Paper>
      ) : hasData ? (
        <>
          <Paper sx={{ mt: 2, p: 2 }}>
            <Selects players={selectsData} />
          </Paper>
          <Paper sx={{ mt: 2 }}>
            <StatsTabs
              seasonId={seasonId}
              players={players}
              totals={totals}
              seasons={seasons}
              totalteams={totalteams}
              onDataChange={handleDataChange}
              offset={offset}
              limit={LIMIT}
              totalDetail={totalDetail}
              totalStats={totalStats}
              totalSeasons={totalSeasons}
              totalTeams={totalTeams}
              lastSeason={lastSeasonRef.current}
            />
          </Paper>
        </>
      ) : (
        <Paper sx={{ mt: 2, p: 2 }}>
          <h3>No players stats for this tournament</h3>
        </Paper>
      )}
    </Container>
  );
};

export default PlayersStats;
