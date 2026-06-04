import { memo, useEffect, useState } from "react";
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
import Pagination from "../../common/Pagination/pagination";

interface Props {
  seasonId: number;
  players: TPlayerStatDetail[];
  totals: TPlayerStatTotal[];
  seasons: TPlayerStatDetail[];
  totalteams: TPlayerStatByClub[];
  onDataChange?: (data: any[]) => void;
  offset: number;
  limit: number;
  totalDetail: number;
  totalStats: number;
  totalSeasons: number;
  totalTeams: number;
  lastSeason: string;
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
  ({
    seasonId,
    players,
    totals,
    seasons,
    totalteams,
    onDataChange,
    offset,
    limit,
    totalDetail,
    totalStats,
    totalSeasons,
    totalTeams,
    lastSeason,
  }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState<Tab["value"]>(
      (searchParams.get("tab") as Tab["value"]) || "one",
    );

    const currentTotal =
      {
        one: totalDetail,
        two: totalStats,
        three: totalSeasons,
        for: totalTeams,
      }[value] ?? 0;

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

    const handlePageChange = (newOffset: number) => {
      const newParams = updateSearchParams(searchParams, {
        offset: String(newOffset),
      });
      setSearchParams(newParams);
    };

    const handleTabChange = (tabValue: Tab["value"]) => {
      let updates: Record<string, string | null> = {
        tab: tabValue,
        offset: "0",
      };

      if (tabValue === "one") {
        updates.season = lastSeason || null;
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
            <StatsDetails
              seasonId={seasonId}
              players={players}
              offset={offset}
            />
          )}
          {value === "two" && <StatsTotal totals={totals} offset={offset} />}
          {value === "three" && (
            <StatsSeason seasons={seasons} offset={offset} />
          )}
          {value === "for" && (
            <StatsTeam totalteams={totalteams} offset={offset} />
          )}
        </Box>
        <Pagination
          offset={offset}
          limit={limit}
          total={currentTotal}
          onPageChange={handlePageChange}
        />
      </Box>
    );
  },
);

export default StatsTabs;
