import { useSearchParams } from "react-router-dom";
import Container from "@mui/material/Container";
import SectionHeader from "../../common/Sections/sectionHeader";
import Selects from "./selects";
import Players from "./players";
import Paper from "@mui/material/Paper";
import { useLatestSeason } from "../../../hooks/useLatestSeason";

const FreeAgents = () => {
  const { startYear } = useLatestSeason();
  const [searchParams] = useSearchParams();
  const seasonId = searchParams.get("season") || startYear;
  const nationId = searchParams.get("nation") || "1";

  return (
    <Container sx={{ py: 1 }}>
      <SectionHeader txtAlign="left" content="Free Agents" />
      <Paper sx={{ mt: 2 }}>
        <Selects nationId={nationId} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Players seasonId={Number(seasonId)} nationId={Number(nationId)} />
      </Paper>
    </Container>
  );
};

export default FreeAgents;
