import Grid from "@mui/material/Grid2";
import SectionHeader from "../common/Sections/sectionHeader";
import SelectNation from "../common/Selects/selectNation";
import Box from "@mui/material/Box";
import { TNationDto } from "../../api/nations/types";
import { memo } from "react";

interface Props {
  nation: TNationDto;
}

const Header = ({ nation }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} alignItems="center">
        <Grid size={1}>
          <img alt="flag" width={60} src={nation.flag} />
        </Grid>
        <Grid size={8}>
          <SectionHeader txtAlign="left" content={nation.name + " - Players"} />
        </Grid>
        <Grid size={3}>
          <SelectNation label="Change Nation" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Header);
