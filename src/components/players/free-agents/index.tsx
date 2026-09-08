import { useSearchParams } from "react-router-dom";
import Container from "@mui/material/Container";
import SectionHeader from "../../common/Sections/sectionHeader";
import Selects from "./selects";
import Players from "./players";
import Paper from "@mui/material/Paper";
import { useLatestSeason } from "../../../hooks/useLatestSeason";
import { useFirstNation } from "../../../hooks/useFirstNation";

const FreeAgents = () => {
  const { startYear } = useLatestSeason();
  const { firstNationId } = useFirstNation();
  const [searchParams] = useSearchParams();
  const seasonId = searchParams.get("season") || startYear;
  const nationId = searchParams.get("nation") || firstNationId;

  return (
    <Container sx={{ py: 1 }}>
      <SectionHeader txtAlign="left" content="Free Agents" />
      <Paper sx={{ mt: 2 }}>
        <Selects />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Players seasonId={Number(seasonId)} nationId={Number(nationId)} />
      </Paper>
    </Container>
  );
};

export default FreeAgents;
