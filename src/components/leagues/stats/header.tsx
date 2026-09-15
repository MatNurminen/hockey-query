import { memo } from "react";
import Grid from "@mui/material/Grid2";
import SectionHeader from "../../common/Sections/sectionHeader";
import SelectLeague from "../../common/Selects/selectLeague";
import { useSearchParams } from "react-router-dom";
import LinkRoute from "../../common/LinkRoute";
import { formatSeason } from "../../utils/formatSeason";

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

    const season = searchParams.get("season");
    if (season) {
      newParams.set("season", season);
    }

    setSearchParams(newParams);
  };

  return (
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
          content={`${league} ${seasonId ? `Stats ${formatSeason(seasonId)}` : "All Time Stats"}`}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 5 }}>
        <SelectLeague onChange={handleLeagueChange} />
      </Grid>
      <Grid size={{ xs: 12 }} mt={2}>
        <LinkRoute
          variant="subtitle2"
          to={
            seasonId
              ? `/leagues/${leagueId}?season=${seasonId}`
              : `/leagues/${leagueId}`
          }
        >
          {"League Information and Facts"}
        </LinkRoute>
      </Grid>
    </Grid>
  );
});

export default Header;
