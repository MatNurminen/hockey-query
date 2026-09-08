import Box from "@mui/material/Box";
import SelectSeason from "../../common/Selects/selectSeason";
import Grid from "@mui/material/Grid2";
import SelectNation from "../../common/Selects/selectNation";
import { memo } from "react";

const Selects = () => {
  return (
    <Box sx={{ py: 3, px: 2 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 5, md: 2 }}>
          <SelectSeason />
        </Grid>
        <Grid size={{ xs: 7, md: 4 }}>
          <SelectNation />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Selects);
