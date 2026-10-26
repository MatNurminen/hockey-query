import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import HeaderSection from "../../common/Table/headerSection";
import Table from "@mui/material/Table";
import { memo, useMemo } from "react";
import type { Cell } from "../../common/Table/types";
import SectionChapter from "../../common/Sections/sectionChapter";
import { getAwardsByPlayer } from "../../../api/awards/queries";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { formatSeason } from "../../utils/formatSeason";
import LinkRoute from "../../common/LinkRoute";

interface Props {
  playerId: number;
  playerName: string;
  headerCells: Cell[];
  tabId: number;
}

type LeagueAwardGroup = {
  id: number;
  leagueId: number;
  shortName: string;
  name: string;
  seasons: number[];
};

const HighlightsTab = ({ playerId, playerName, headerCells, tabId }: Props) => {
  const isSeasonTab = tabId === 0;

  const { data: awards, isError, isLoading } = getAwardsByPlayer(playerId);

  const groupedSeasonAwards = useMemo(() => {
    if (!awards) return [];
    const map = new Map<number, typeof awards>();
    awards.forEach((award) => {
      const list = map.get(award.season_id) ?? [];
      list.push(award);
      map.set(award.season_id, list);
    });
    return Array.from(map.entries());
  }, [awards]);

  const groupedLeagueAwards = useMemo<LeagueAwardGroup[]>(() => {
    if (!awards) return [];
    const map = new Map<string, LeagueAwardGroup>();
    awards.forEach((award) => {
      const key = `${award.league_id}:${award.id}`;
      const group = map.get(key) ?? {
        id: award.id,
        leagueId: award.league_id,
        shortName: award.short_name,
        name: award.name,
        seasons: [],
      };
      group.seasons.push(award.season_id);
      map.set(key, group);
    });
    return Array.from(map.values());
  }, [awards]);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!awards) return <h3>No data available</h3>;

  return (
    <>
      <SectionChapter
        txtAlign={"left"}
        content={`${playerName} Career Highlights`}
      />
      <TableContainer component={Paper}>
        <Table size="small">
          <HeaderSection cells={headerCells} />
          <TableBody>
            {isSeasonTab
              ? groupedSeasonAwards.map(([seasonId, seasonAwards]) => (
                  <TableRow key={seasonId}>
                    <TableCell sx={{ verticalAlign: "top" }}>
                      {formatSeason(seasonId)}
                    </TableCell>
                    <TableCell>
                      <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
                        {seasonAwards.map((a) => (
                          <li key={a.id ?? `${a.short_name}-${a.name}`}>
                            <LinkRoute
                              underline="hover"
                              to={`/league-awards?leagueId=${a.league_id}&awardId=${a.id}`}
                            >
                              {a.short_name} {a.name}
                            </LinkRoute>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))
              : groupedLeagueAwards.map((group) => (
                  <TableRow key={`${group.leagueId}:${group.id}`}>
                    <TableCell sx={{ verticalAlign: "top" }}>
                      <LinkRoute
                        underline="hover"
                        to={`/league-awards?leagueId=${group.leagueId}&awardId=${group.id}`}
                      >
                        {[group.shortName, group.name]
                          .filter(Boolean)
                          .join(" ")}
                      </LinkRoute>{" - "}
                      {[...new Set(group.seasons)]
                        .sort((a, b) => b - a)
                        .map((seasonId) => formatSeason(seasonId))
                        .join(", ")}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(HighlightsTab);
