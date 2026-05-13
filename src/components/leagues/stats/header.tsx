import { memo } from "react";
import Grid from "@mui/material/Grid2";
import SectionHeader from "../../common/Sections/sectionHeader";
import SelectLeague from "../../common/Selects/selectLeague";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import Link from "@mui/material/Link";

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
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid size={{ xs: 7 }}>
          <SectionHeader
            txtAlign="left"
            content={`${league} ${seasonId ? `${seasonId}-${seasonId + 1} Stats` : "All time Stats"}`}
          />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <SelectLeague onChange={handleLeagueChange} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Link
            variant="subtitle2"
            underline="hover"
            component={RouterLink}
            to={`/leagues/${leagueId}`}
          >
            {"League Information and Facts"}
          </Link>
        </Grid>
      </Grid>
    </>
  );
});

export default Header;
