import Grid from "@mui/material/Grid2";
import SelectLeague from "../common/Selects/selectLeague";
import SelectSeason from "../common/Selects/selectSeason";
import { memo } from "react";

const Selects = () => {
  return (
  
    <Grid container spacing={4} mb={4}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <SelectLeague />
      </Grid>
      <Grid size={{ xs: 6, sm: 4, md: 2 }}>
        <SelectSeason />
      </Grid>
    </Grid>

  );
};

export default memo(Selects);
