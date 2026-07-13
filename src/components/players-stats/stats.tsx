import { useState } from "react";
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

const Stats = ({ goalies, nationId, seasonId }: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const items: { id: number; title: string; typeId: number }[] = [
    { id: 0, title: "Europe", typeId: 1 },
    { id: 1, title: "North America", typeId: 2 },
    { id: 2, title: "International", typeId: 3 },
  ];

  const configs: MultipleStatsConfig<PlayersStatsDetailParams>[] = [
    {
      id: 1,
      name: "europe",
      params: {
        nationId,
        seasonId,
        excludeLeagueId: [14, 15],
        typeId: 1,
      },
    },
    {
      id: 2,
      name: "america",
      params: {
        nationId,
        seasonId,
        leagueId: [14, 15],
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
  ];

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
          {value === item.id && (
            <StatsTab
              goalies={goalies}
              tabHeader={item.title}
              players={player[item.id].list}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Stats;
