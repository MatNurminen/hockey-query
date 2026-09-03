import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Cards from "./Cards";
import Leagues from "./Leagues";
import { useLatestSeason } from "../../hooks/useLatestSeason";

const Main = () => {
  const { startYear: latestSeason } = useLatestSeason();

  return (
    <Container sx={{ pt: 4, bgcolor: "background.paper" }}>
      <Grid container spacing={4}>
        <Grid size={{ sm: 12, md: 8 }}>
          <Cards />
        </Grid>
        <Grid size={{ md: 4 }} sx={{ display: { xs: "none", md: "block" } }}>
          <Leagues curSeason={latestSeason} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
