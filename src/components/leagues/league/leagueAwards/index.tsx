import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import SectionHeader from "../../../common/Sections/sectionHeader";
import {
  getAwardsPlayersDetails,
  getAwardsPlayersTotals,
} from "../../../../api/awards/queries";
import AwardsTotals from "./awardsTotals";
import AwardsDetails from "./awardsDetails";
import { getLeague } from "../../../../api/leagues/queries";

const LIMIT = 50;

const LeagueAwards = () => {
  const [searchParams] = useSearchParams();
  const leagueId = Number(searchParams.get("leagueId"));
  const awardId = Number(searchParams.get("awardId"));

  const [totalsOffset, setTotalsOffset] = useState(0);
  const [detailsOffset, setDetailsOffset] = useState(0);

  useEffect(() => {
    setTotalsOffset(0);
    setDetailsOffset(0);
  }, [leagueId, awardId]);

  const { data: awardsTotals } = getAwardsPlayersTotals({
    leagueId,
    awardId,
    limit: LIMIT,
    offset: totalsOffset,
  });
  const { data: awardsDetails } = getAwardsPlayersDetails({
    leagueId,
    awardId,
    limit: LIMIT,
    offset: detailsOffset,
  });
  const { data: league } = getLeague(leagueId);
  const league_name = league?.short_name;

  if (!awardsTotals || !awardsDetails) return <h3>No data available</h3>;

  return (
    <Container sx={{ py: 1 }}>
      <SectionHeader
        txtAlign="left"
        content={`Awards - ${league_name} ${awardsDetails.data[0]?.name ?? ""}`}
      />
      <AwardsTotals
        players={awardsTotals.data}
        offset={totalsOffset}
        limit={LIMIT}
        total={awardsTotals.total}
        onPageChange={setTotalsOffset}
      />
      <AwardsDetails
        players={awardsDetails.data}
        offset={detailsOffset}
        limit={LIMIT}
        total={awardsDetails.total}
        onPageChange={setDetailsOffset}
      />
    </Container>
  );
};

export default LeagueAwards;
