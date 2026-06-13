import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import SectionFirst from "../common/Sections/sectionFirst";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "70px",
  maxHeight: "70px",
});

interface ClubHeaderProps {
  team: string;
  logo: string;
}

const ClubHeader = ({ team, logo }: ClubHeaderProps) => {
  return (
    <Box sx={{ mt: 4, mb: 1 }}>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid size={2}>
          <Img alt="" src={logo} />
        </Grid>
        <Grid size={10}>
          <SectionFirst content={team} txtAlign="left" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClubHeader;
