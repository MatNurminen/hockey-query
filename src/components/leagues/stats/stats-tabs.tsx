import { memo, useEffect, useRef, useState } from "react";
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
import { useSearchParams } from "react-router-dom";
import { updateSearchParams } from "../../utils/urlHelpers";

interface Props {
  seasonId: number;
  players: TPlayerStatDetail[];
  totals: TPlayerStatTotal[];
  seasons: TPlayerStatDetail[];
  totalteams: TPlayerStatByClub[];
  onDataChange?: (data: any[]) => void;
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
  ({ seasonId, players, totals, seasons, totalteams, onDataChange }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<Tab["value"]>(
      (searchParams.get("tab") as Tab["value"]) || "one",
    );

    const lastSeasonRef = useRef<string>(seasonId.toString());

    useEffect(() => {
      if (seasonId > 0) {
        lastSeasonRef.current = seasonId.toString();
      }
    }, [seasonId]);

    useEffect(() => {
      if (onDataChange) {
        let currentData: any[] = [];
        switch (value) {
          case "one":
            currentData = players;
            break;
          case "two":
            currentData = totals;
            break;
          case "three":
            currentData = seasons;
            break;
          case "for":
            currentData = totalteams;
            break;
        }
        onDataChange(currentData);
      }
    }, [value, players, totals, seasons, totalteams, onDataChange]);

    const handleTabChange = (tabValue: Tab["value"]) => {
      let updates: Record<string, string | null> = { tab: tabValue };

      if (tabValue === "one") {
        updates.season = lastSeasonRef.current;
      } else {
        updates.season = null;
      }

      const newParams = updateSearchParams(searchParams, updates, {
        keepTab: false,
      });
      setSearchParams(newParams);
      setValue(tabValue);
    };

    return (
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2, px: 2, pt: 2 }}>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={value === tab.value ? "contained" : "outlined"}
              color="ocean"
              onClick={() => handleTabChange(tab.value)}
              sx={{ borderRadius: "18px" }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>

        <Box>
          {value === "one" && (
            <StatsDetails seasonId={seasonId} players={players} />
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
