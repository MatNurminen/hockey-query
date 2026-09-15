import { useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Header from "./header";
import { useSearchParams } from "react-router-dom";
import StatsTabs from "./stats-tabs";
import {
  getPlayersStatsDetail,
  getPlayersStatsTotal,
  getPlayersStatsTotalByTeam,
} from "../../../api/players-stats/queries";
import SelectSeason from "../../common/Selects/selectSeason";
import Box from "@mui/material/Box";
import { updateSearchParams } from "../../utils/urlHelpers";
import { useLatestSeason } from "../../../hooks/useLatestSeason";

const LIMIT = 50;

const PlayersStats = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const leagueId = Number(searchParams.get("league"));
  const tab = searchParams.get("tab") || "one";
  const isSeasonTab = tab === "one";
  const { startYear: latestSeason } = useLatestSeason();

  // Последний выбранный сезон: на All-Time табах параметр уходит из URL,
  // и без этого возврат на таб Season сбрасывал бы выбор на последний сезон
  const lastSeasonRef = useRef<number | null>(null);
  const seasonParam =
    Number(searchParams.get("season")) || lastSeasonRef.current || latestSeason;
  // Сезон показываем только на табе Season: на остальных он не имеет смысла
  const seasonId = isSeasonTab ? seasonParam : 0;
  const playerOrd = searchParams.get("playerOrd")
    ? [Number(searchParams.get("playerOrd"))]
    : undefined;
  const teamId = Number(searchParams.get("teamId")) || undefined;
  const nationId = Number(searchParams.get("nationId")) || undefined;
  const offset = Number(searchParams.get("offset")) || 0;

  useEffect(() => {
    const seasonFromUrl = Number(searchParams.get("season"));

    if (seasonFromUrl) {
      lastSeasonRef.current = seasonFromUrl;
    }

    if (isSeasonTab) {
      // Сезон в URL, иначе страница зафиксирует его отсутствие
      if (!seasonFromUrl && latestSeason) {
        setSearchParams(
          updateSearchParams(searchParams, {
            season: lastSeasonRef.current ?? latestSeason,
          }),
          { replace: true },
        );
      }
    } else if (searchParams.get("season")) {
      setSearchParams(updateSearchParams(searchParams, { season: null }), {
        replace: true,
      });
    }
  }, [isSeasonTab, latestSeason, searchParams, setSearchParams]);

  const detailParams = {
    leagueId: [leagueId],
    seasonId: seasonParam,
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

  const { data: playersResponse } = getPlayersStatsDetail(detailParams);

  const { data: totalsResponse } = getPlayersStatsTotal(totalParams);

  const { data: seasonsResponse } = getPlayersStatsDetail(seasonParams);

  const { data: totalteamsResponse } =
    getPlayersStatsTotalByTeam(totalByTeamParams);

  const players = playersResponse?.data ?? [];
  const totals = totalsResponse?.data ?? [];
  const seasons = seasonsResponse?.data ?? [];
  const totalteams = totalteamsResponse?.data ?? [];

  const totalDetail = playersResponse?.total ?? 0;
  const totalStats = totalsResponse?.total ?? 0;
  const totalSeasons = seasonsResponse?.total ?? 0;
  const totalTeams = totalteamsResponse?.total ?? 0;

  const league = players[0]?.short_name || "";

  return (
    <Container sx={{ py: 1, mt: 2, mb: 10 }}>
      <Box sx={{ px: 2, pb: 1 }}>
        <Header league={league} leagueId={leagueId} seasonId={seasonId} />
      </Box>
      {isSeasonTab && (
        <Box sx={{ mt: 1, p: 2 }}>
          <SelectSeason value={seasonParam ? String(seasonParam) : ""} />
        </Box>
      )}
      <StatsTabs
        seasonId={seasonId}
        players={players}
        totals={totals}
        seasons={seasons}
        totalteams={totalteams}
        offset={offset}
        limit={LIMIT}
        totalDetail={totalDetail}
        totalStats={totalStats}
        totalSeasons={totalSeasons}
        totalTeams={totalTeams}
      />
    </Container>
  );
};

export default PlayersStats;
