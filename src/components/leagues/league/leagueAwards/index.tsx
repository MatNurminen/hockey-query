import Container from "@mui/material/Container";
import { useSearchParams } from "react-router";
import SectionHeader from "../../../common/Sections/sectionHeader";
import { getAwardsPlayersDetails, getAwardsPlayersTotals } from "../../../../api/awards/queries";
import Paper from "@mui/material/Paper";
import AwardsTotals from "./awardsTotals";
import AwardsDetails from "./awardsDetails";

const LeagueAwards = () => {
  const [searchParams] = useSearchParams();
  //const leagueId = Number(searchParams.get("leagueId")) || startYear;
  //const nationId = Number(searchParams.get("nation")) || firstNationId;
  const leagueId = Number(searchParams.get("leagueId"));
  const awardId = Number(searchParams.get("awardId"));

  const { data: awardsTotals } = getAwardsPlayersTotals(leagueId, awardId);
  const { data: awardsDetails } = getAwardsPlayersDetails(leagueId, awardId);

  if (!awardsTotals) return <h3>No data available</h3>;
  if (!awardsDetails) return <h3>No data available</h3>;

  return (
    <Container sx={{ py: 1 }}>
      <SectionHeader
        txtAlign="left"
        content={`Awards - ${awardsDetails?.[0].name}`}
      />
      <Paper sx={{ mt: 2 }}>
        <AwardsTotals players={awardsTotals}/>
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <AwardsDetails players={awardsDetails}/>
      </Paper>
    </Container>
  );
};

export default LeagueAwards;
