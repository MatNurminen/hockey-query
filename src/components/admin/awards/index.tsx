import { useSearchParams } from "react-router-dom";
import { useFirstLeague } from "../../../hooks/useFirstLeague";
import { memo } from "react";
import Container from "@mui/material/Container";
import Header from "./header";
import { getLeague } from "../../../api/leagues/queries";
import AwardsByLeague from "./awardsByLeague";

const Awards = () => {
  const [searchParams] = useSearchParams();
  const { firstLeagueId } = useFirstLeague();
  const leagueId = Number(searchParams.get("league")) || firstLeagueId;
  const { data: league } = getLeague(leagueId, leagueId > 0);

  if (!leagueId || !league) return null;

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <Header leagueId={leagueId}/>
      <AwardsByLeague league={league} />
    </Container>
  );
};

export default memo(Awards);
