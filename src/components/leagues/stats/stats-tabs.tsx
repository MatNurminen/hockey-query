import { memo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StatsDetails from "./stats-details";
import StatsTotal from "./stats-total";
import StatsSeason from "./stats-season";
import StatsTeam from "./stats-team";
import {
  TPlayerStatDetail,
  TPlayerStatTotal,
  TPlayerStatByClub,
} from "../../../api/players-stats/types";

interface Props {
  season: string;
  players: TPlayerStatDetail[];
  totals: TPlayerStatTotal[];
  seasons: TPlayerStatDetail[];
  totalteams: TPlayerStatByClub[];
}

interface Tab {
  value: "one" | "two" | "three" | "for";
  label: string;
}

const tabs: Tab[] = [
  { value: "one", label: "Season" },
  { value: "two", label: "All-Time" },
  { value: "three", label: "All-Time / Season" },
  { value: "for", label: "All-Time / Team" },
];

const StatsTabs = memo(
  ({ season, players, totals, seasons, totalteams }: Props) => {
    const [value, setValue] = useState<Tab["value"]>("one");

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2, px: 2, pt: 2 }}>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={value === tab.value ? "contained" : "outlined"}
              color="ocean"
              onClick={() => setValue(tab.value)}
              sx={{ borderRadius: "18px" }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>

        <Box>
          {value === "one" && (
            <StatsDetails season={season} players={players} />
          )}
          {value === "two" && <StatsTotal totals={totals} />}
          {value === "three" && <StatsSeason seasons={seasons} />}
          {value === "for" && <StatsTeam totalteams={totalteams} />}
        </Box>
      </Box>
    );
  },
);

export default StatsTabs;
