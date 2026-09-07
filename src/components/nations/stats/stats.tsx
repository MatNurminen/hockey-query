import { useState, useMemo } from "react";
import Tab from "@mui/material/Tab";
import StyledTabs from "../../common/Tabs/styledTabs";
import StatsTab from "./statsTab";
import {
  useMultiplePlayersStatsDetail,
  type MultipleStatsConfig,
} from "../../../api/players-stats/hooks";
import type { PlayersStatsDetailParams } from "../../../api/players-stats/types";
import { tournaments } from "./tournaments";
import { useSearchParams } from "react-router-dom";

interface Props {
  nation: string;
  nationId: number;
  seasonId: number;
  enabled: boolean;
}

const items: { id: number; title: string }[] = [
  { id: 0, title: "Forwards" },
  { id: 1, title: "Defensemen" },
  { id: 2, title: "Goaltenders" },
];

const Stats = ({ nation, nationId, seasonId, enabled }: Props) => {
  const [value, setValue] = useState(0);
  const [searchParams] = useSearchParams();
  const tournamentId = Number(searchParams.get("tournament")) || 0;
  const typeId = tournaments.find((t) => t.id === tournamentId)?.typeId;
  const northAmericaLeagues = tournaments.find(
    (t) => t.id === tournamentId,
  )?.northAmericaLeagues;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const configs = useMemo<
    MultipleStatsConfig<PlayersStatsDetailParams>[]
  >(() => {
    let leagueFilter: Partial<
      Pick<PlayersStatsDetailParams, "leagueId" | "excludeLeagueId">
    > = {};
    if (tournamentId === 0) {
      leagueFilter = { excludeLeagueId: northAmericaLeagues ?? [] };
    } else if (tournamentId === 1) {
      leagueFilter = { leagueId: northAmericaLeagues ?? [] };
    }

    return [
      {
        id: 1,
        name: "forwards",
        params: {
          nationId,
          seasonId,
          ...leagueFilter,
          playerOrd: [3],
          typeId,
        },
      },
      {
        id: 2,
        name: "defensemen",
        params: {
          nationId,
          seasonId,
          ...leagueFilter,
          playerOrd: [2],
          typeId,
        },
      },
      {
        id: 3,
        name: "goaltenders",
        params: {
          nationId,
          seasonId,
          ...leagueFilter,
          playerOrd: [1],
          typeId,
        },
      },
    ];
  }, [nationId, seasonId, typeId, tournamentId, northAmericaLeagues]);

  const { data: player } = useMultiplePlayersStatsDetail(configs, enabled);

  return (
    <>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="stats"
        variant="fullWidth"
      >
        {items.map((item) => (
          <Tab key={item.id} label={item.title} />
        ))}
      </StyledTabs>
      {items.map((item) => (
        <div key={item.id} hidden={value !== item.id}>
          <StatsTab
            nation={nation}
            title={item.title}
            players={player[item.id].list}
          />
        </div>
      ))}
    </>
  );
};

export default Stats;
