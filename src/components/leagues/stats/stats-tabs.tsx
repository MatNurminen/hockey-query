import { memo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import StatsDetails from "./stats-details";
import StatsTotal from "./stats-total";
import StatsSeason from "./stats-season";
import StatsTeam from "./stats-team";
import Selects from "./selects";
import {
  TPlayerStatDetail,
  TPlayerStatTotal,
  TPlayerStatByClub,
} from "../../../api/players-stats/types";
import { useSearchParams } from "react-router-dom";
import { updateSearchParams } from "../../utils/urlHelpers";
import Pagination from "../../common/Pagination/pagination";
import Grid from "@mui/material/Grid2";

interface Props {
  seasonId: number;
  players: TPlayerStatDetail[];
  totals: TPlayerStatTotal[];
  seasons: TPlayerStatDetail[];
  totalteams: TPlayerStatByClub[];
  offset: number;
  limit: number;
  totalDetail: number;
  totalStats: number;
  totalSeasons: number;
  totalTeams: number;
}

interface Tab {
  value: "one" | "two" | "three" | "four";
  label: string;
}

const tabs: Tab[] = [
  { value: "one", label: "Season" },
  { value: "two", label: "All-Time" },
  { value: "three", label: "All-Time / Season" },
  { value: "four", label: "All-Time / Team" },
];

const StatsTabs = memo(
  ({
    seasonId,
    players,
    totals,
    seasons,
    totalteams,
    offset,
    limit,
    totalDetail,
    totalStats,
    totalSeasons,
    totalTeams,
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
        four: totalTeams,
      }[value] ?? 0;

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

      if (tabValue === "two") {
        updates.teamId = null;
      }

      const newParams = updateSearchParams(searchParams, updates, {
        keepTab: false,
      });
      setSearchParams(newParams);
      setValue(tabValue);
    };

    const currentData =
      {
        one: players,
        two: totals,
        three: seasons,
        four: totalteams,
      }[value] ?? [];

    return (
      <Grid container spacing={2}>
        <Grid size={12}>
          <Paper sx={{ mt: 2, p: 2 }}>
            <Selects players={currentData} />
          </Paper>
        </Grid>
        <Grid size={12}>
          <Paper>
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
              {value === "two" && (
                <StatsTotal totals={totals} offset={offset} />
              )}
              {value === "three" && (
                <StatsSeason seasons={seasons} offset={offset} />
              )}
              {value === "four" && (
                <StatsTeam totalteams={totalteams} offset={offset} />
              )}
            </Box>
            <Pagination
              offset={offset}
              limit={limit}
              total={currentTotal}
              onPageChange={handlePageChange}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  },
);

export default StatsTabs;
