import { memo } from "react";
import Grid from "@mui/material/Grid2";
import SectionHeader from "../../common/Sections/sectionHeader";
import SelectLeague from "../../common/Selects/selectLeague";
import { useSearchParams } from "react-router-dom";
import LinkRoute from "../../common/LinkRoute";

interface Props {
  league: string;
  leagueId: number;
  seasonId: number;
}

const Header = memo(({ league, leagueId, seasonId }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLeagueChange = (newLeagueId: string) => {
    const newParams = new URLSearchParams();
    newParams.set("league", newLeagueId);
    newParams.set("season", searchParams.get("season") || "");
    setSearchParams(newParams);
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid size={{ xs: 12, sm: 7 }}>
          <SectionHeader
            txtAlign="left"
            content={`${league} ${seasonId ? `${seasonId}-${seasonId + 1} Stats` : "All time Stats"}`}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 5 }}>
          <SelectLeague onChange={handleLeagueChange} />
        </Grid>
        <Grid size={{ xs: 12 }} mt={2}>
          <LinkRoute
            variant="subtitle2"
            to={`/leagues/${leagueId}?season=${seasonId}`}
          >
            {"League Information and Facts"}
          </LinkRoute>
        </Grid>
      </Grid>
    </>
  );
});

export default Header;
