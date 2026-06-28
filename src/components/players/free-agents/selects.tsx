import Box from "@mui/material/Box";
import SelectSeason from "../../common/Selects/selectSeason";
import Grid from "@mui/material/Grid2";
import SelectNation from "../../common/Selects/selectNation";
import { memo } from "react";

interface Props {
  nationId: string;
}

const Selects = ({ nationId }: Props) => {
  return (
    <Box sx={{ flexGrow: 1, py: 3, pl: 2 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 5 }}>
          <SelectSeason />
        </Grid>
        <Grid size={{ xs: 3 }}>
          <SelectNation defaultValue={nationId} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Selects);
