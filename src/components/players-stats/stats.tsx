import { useState, useMemo } from "react";
import Tab from "@mui/material/Tab";
import StyledTabs from "../common/Tabs/styledTabs";
import StatsTab from "./statsTab";
import {
  useMultiplePlayersStatsDetail,
  type MultipleStatsConfig,
} from "../../api/players-stats/hooks";
import type { PlayersStatsDetailParams } from "../../api/players-stats/types";

interface Props {
  goalies: boolean;
  nationId: number;
  seasonId: number;
}

const items: { id: number; title: string }[] = [
  { id: 0, title: "Europe" },
  { id: 1, title: "North America" },
  { id: 2, title: "International" },
];

const northAmericaLeagues = [14, 15]

const Stats = ({ goalies, nationId, seasonId }: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const configs = useMemo<MultipleStatsConfig<PlayersStatsDetailParams>[]>(
    () => [
      {
        id: 1,
        name: "europe",
        params: {
          nationId,
          seasonId,
          excludeLeagueId: northAmericaLeagues,
          typeId: 1,
        },
      },
      {
        id: 2,
        name: "america",
        params: {
          nationId,
          seasonId,
          leagueId: northAmericaLeagues,
        },
      },
      {
        id: 3,
        name: "international",
        params: {
          nationId,
          seasonId,
          typeId: 2,
        },
      },
    ],
    [nationId, seasonId],
  );

  const { data: player } = useMultiplePlayersStatsDetail(configs);

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
            goalies={goalies}
            tabHeader={item.title}
            players={player[item.id].list}
          />
        </div>
      ))}
    </>
  );
};

export default Stats;
