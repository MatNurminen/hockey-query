import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useSearchParams } from "react-router-dom";
import { getNation } from "../../api/nations/queries";
import Header from "./header";
import Stats from "./stats";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { useLatestSeason } from "../../hooks/useLatestSeason";

const NationStats = () => {
  const [searchParams] = useSearchParams();
  const { startYear } = useLatestSeason();
  const nationId = Number(searchParams.get("nation")) || 1;
  const seasonId = Number(searchParams.get("season")) || startYear;

  const { data: nation, isLoading, isError } = getNation(nationId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <h3>Error!</h3>;
  if (!nation) return <h3>No data available</h3>;

  return (
    <Container sx={{ py: 1, mt: 4 }}>
      <Grid container spacing={2} direction="row">
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ px: 2 }}>
            <Header nation={nation} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ mt: 2 }}>
            <Stats
              goalies={false}
              nationId={nationId}
              seasonId={seasonId}
            />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }} mt={2}>
          <Divider />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ mt: 2 }}>
            <Stats
              goalies={true}
              nationId={nationId}
              seasonId={seasonId}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NationStats;
