import { memo } from "react";
import Grid from "@mui/material/Grid2";
import SectionHeader from "../../common/Sections/sectionHeader";
import SelectSeason from "../../common/Selects/selectSeason";
import SelectLeague from "../../common/Selects/selectLeague";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const Header = ({ league, leagueId, season }: any) => {
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
            content={league + " " + season + " Stats"}
          />
        </Grid>
        <Grid size={{ xs: 2 }}>
          <SelectSeason />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <SelectLeague />
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
};

export default memo(Header);
