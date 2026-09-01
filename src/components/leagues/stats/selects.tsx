import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import AppButton from "../../common/Buttons/appButton";
import { navigateWithParams, deleteParams } from "../../utils/urlHelpers";
import {
  getPlayersStatsDetail,
  getPlayersStatsTotal,
  getPlayersStatsTotalByTeam,
} from "../../../api/players-stats/queries";

interface Position {
  id: number;
  name: string;
}

interface Team {
  id: number;
  name: string;
}

interface Nation {
  nation_id: number;
  player_nation: string;
  player_flag: string;
  count: number;
}

const positions: Position[] = [
  { id: 0, name: "All Positions" },
  { id: 3, name: "Forward" },
  { id: 2, name: "Defenseman" },
  { id: 1, name: "Goalie" },
];

const Selects = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPosition = Number(searchParams.get("playerOrd"));
  const currentTeam = Number(searchParams.get("teamId"));
  const currentNation = Number(searchParams.get("nationId"));
  const isAnyFilterActive = currentPosition || currentTeam || currentNation;
  const currentTab = searchParams.get("tab") || "one";
  const isAllTimeTab = currentTab === "two";
  const leagueId = Number(searchParams.get("league"));
  const seasonId = Number(searchParams.get("season"));
  const playerOrd = searchParams.get("playerOrd")
    ? [Number(searchParams.get("playerOrd"))]
    : undefined;
  const isSeasonTab = currentTab === "one" || currentTab === "three";
  const isTotalsTab = currentTab === "two";
  const isTeamTab = currentTab === "four";
  const seasonParam = currentTab === "one" ? seasonId : undefined;

  const { data: detailData } = getPlayersStatsDetail(
    {
      leagueId: [leagueId],
      seasonId: seasonParam,
      playerOrd,
    },
    { enabled: isSeasonTab },
  );
  const { data: totalsData } = getPlayersStatsTotal(
    { leagueId, playerOrd },
    { enabled: isTotalsTab },
  );
  const { data: byClubData } = getPlayersStatsTotalByTeam(
    { leagueId, playerOrd },
    { enabled: isTeamTab },
  );

  const tabData =
    currentTab === "four"
      ? byClubData?.data
      : currentTab === "two"
        ? totalsData?.data
        : detailData?.data;

  const teams: Team[] = Array.from(
    new Map(
      (
        (tabData as
          | Array<{
              team_id: number;
              full_name: string;
              nation_id?: number;
            }>
          | undefined) ?? []
      )
        .filter((row) => !currentNation || row.nation_id === currentNation)
        .filter((row) => row.team_id && row.full_name)
        .map((row): [number, Team] => [
          row.team_id,
          { id: row.team_id, name: row.full_name },
        ]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));

  const nationsSource = (
    (tabData as
      | Array<{
          team_id?: number;
          player_id: number;
          nation_id: number;
          player_nation: string;
          player_flag: string;
        }>
      | undefined) ?? []
  ).filter((row) => !currentTeam || row.team_id === currentTeam);

  const byNation = new Map<number, Nation>();
  const seenPlayers = new Set<number>();
  for (const player of nationsSource) {
    const { player_id, nation_id, player_nation, player_flag } = player;
    if (!nation_id || !player_nation || seenPlayers.has(player_id)) continue;
    seenPlayers.add(player_id);
    const nation = byNation.get(nation_id);
    if (nation) {
      nation.count += 1;
    } else {
      byNation.set(nation_id, {
        nation_id,
        player_nation,
        player_flag,
        count: 1,
      });
    }
  }
  const nations: Nation[] = Array.from(byNation.values()).sort((a, b) =>
    a.player_nation.localeCompare(b.player_nation),
  );

  const safeTeam = teams.some((team) => team.id === currentTeam)
    ? currentTeam
    : 0;
  const safeNation = nations.some(
    (nation) => nation.nation_id === currentNation,
  )
    ? currentNation
    : 0;

  useEffect(() => {
    if (
      tabData &&
      currentNation &&
      !nations.some((nation) => nation.nation_id === currentNation)
    ) {
      const newParams = deleteParams(searchParams, ["nationId"]);
      navigate(`?${newParams.toString()}`);
    }
  }, [tabData, nations, currentNation, searchParams, navigate]);

  useEffect(() => {
    if (
      tabData &&
      currentTeam &&
      !teams.some((team) => team.id === currentTeam)
    ) {
      const newParams = deleteParams(searchParams, ["teamId"]);
      navigate(`?${newParams.toString()}`);
    }
  }, [tabData, teams, currentTeam, searchParams, navigate]);

  const handlePositionChange = (event: SelectChangeEvent<number>) => {
    if (event.target.value === 0) {
      const newParams = deleteParams(searchParams, ["playerOrd"]);
      navigate(`?${newParams.toString()}`);
    } else {
      navigateWithParams(navigate, searchParams, {
        playerOrd: event.target.value,
      });
    }
  };

  const handleTeamChange = (event: SelectChangeEvent<number>) => {
    if (Number(event.target.value) === 0) {
      const newParams = deleteParams(searchParams, ["teamId"]);
      navigate(`?${newParams.toString()}`);
    } else {
      navigateWithParams(navigate, searchParams, {
        teamId: event.target.value,
      });
    }
  };

  const handleNationChange = (event: SelectChangeEvent<number>) => {
    if (Number(event.target.value) === 0) {
      const newParams = deleteParams(searchParams, ["nationId"]);
      navigate(`?${newParams.toString()}`);
    } else {
      navigateWithParams(navigate, searchParams, {
        nationId: event.target.value,
      });
    }
  };

  const handleReset = () => {
    const newParams = deleteParams(searchParams, [
      "playerOrd",
      "teamId",
      "nationId",
    ]);
    navigate(`?${newParams.toString()}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 4, md: 2 }}>
        <FormControl fullWidth size="small">
          <Select
            labelId="positions-label"
            id="positions-select"
            value={currentPosition || 0}
            onChange={handlePositionChange}
            sx={{ backgroundColor: "white" }}
          >
            {positions.map((position: Position) => (
              <MenuItem key={position.id} value={position.id}>
                {position.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 8, md: 4 }}>
        <FormControl fullWidth size="small">
          <Select
            id="teams-select"
            defaultValue={0}
            value={safeTeam}
            onChange={handleTeamChange}
            disabled={isAllTimeTab}
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="0">All Teams</MenuItem>
            {teams.map((team: Team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <FormControl fullWidth size="small">
          <Select
            id="nations-select"
            defaultValue={0}
            value={safeNation}
            onChange={handleNationChange}
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="0">All Nationalities</MenuItem>
            {nations.map((nation: Nation) => (
              <MenuItem key={nation.nation_id} value={nation.nation_id}>
                <Box display="flex" alignItems="center">
                  <Box display="flex" sx={{ mr: 1 }}>
                    <TableFlag alt="" src={nation.player_flag} />
                  </Box>
                  {nation.player_nation} ({nation.count})
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }} alignContent={"center"} textAlign={"end"}>
        <AppButton
          size="small"
          text="Reset Filter"
          iconName="reset"
          disabled={!isAnyFilterActive}
          onClick={handleReset}
          color="success"
        />
      </Grid>
    </Grid>
  );
};

export default Selects;
