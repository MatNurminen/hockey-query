import Grid from "@mui/material/Grid2";
import SectionFirst from "../common/Sections/sectionFirst";
import { memo } from "react";
import MainLogo from "../common/Images/mainLogo";

interface ClubHeaderProps {
  team: string;
  logo: string;
}

const ClubHeader = ({ team, logo }: ClubHeaderProps) => {
  return (
    <Grid
      container
      ml={2}
      py={{ xs: 2, md: 3 }}
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid pl={{ sm: 2 }} size={{ xs: 3, sm: 2 }}>
        <MainLogo alt="" src={logo} />
      </Grid>
      <Grid size={{ xs: 9, sm: 10 }}>
        <SectionFirst content={team} txtAlign="left" />
      </Grid>
    </Grid>
  );
};

export default memo(ClubHeader);
