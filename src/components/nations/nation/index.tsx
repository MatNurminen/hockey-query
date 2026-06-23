import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import Header from "./header";
import International from "./international";
import Paper from "@mui/material/Paper";
import Leagues from "./leagues";
import { getNation } from "../../../api/nations/queries";
import PlrsStatsTotal from "./plrsStatsTotal";
import PlrsStatsSeason from "./plrsStatsSeason";
import SelectSeason from "../../common/Selects/selectSeason";
import Box from "@mui/material/Box";

const Nation = () => {
  const params = useParams();
  const nationId = Number(params.id);

  const { data: nation, isError, isLoading } = getNation(nationId);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!nation) return <h3>No data available</h3>;

  return (
    <Container sx={{ py: 1, mt: 2, mb: 10 }}>
      <Paper sx={{ px: 2, pb: 1 }}>
        <Header nation={nation} nationId={nationId} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Leagues nationId={nationId} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <International nation={nation} />
      </Paper>
      <Paper sx={{ mt: 2, p: 2 }}>
        <SelectSeason />
      </Paper>
      <Box sx={{ mt: 2 }}>
        <PlrsStatsSeason nationId={nationId} natName={nation.name} />
      </Box>
      <Box>
        <PlrsStatsTotal nationId={nationId} />
      </Box>
    </Container>
  );
};

export default Nation;
