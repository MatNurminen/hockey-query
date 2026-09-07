import Grid from "@mui/material/Grid2";
import SectionHeader from "../../common/Sections/sectionHeader";
import SelectNation from "../../common/Selects/selectNation";
import Box from "@mui/material/Box";
import { TNationDto } from "../../../api/nations/types";
import { memo } from "react";
import MainLogo from "../../common/Images/mainLogo";

interface Props {
  nation: TNationDto;
}

const Header = ({ nation }: Props) => {
  return (
    <Box sx={{ flexGrow: 1, py: 2 }}>
      <Grid container alignItems="center">
        <Grid size={{xs: 12, sm: 1.5, lg: 1}}>
          <MainLogo alt="" src={nation.flag} />
        </Grid>
        <Grid size={{xs: 12, sm: 6.5, lg: 7}}>
          <SectionHeader txtAlign="left" content={nation.name + " - Players"} />
        </Grid>
        <Grid size={{xs: 12, sm: 4, lg: 4}}>
          <SelectNation label="Change Nation" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(Header);
