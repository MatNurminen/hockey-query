import Container from "@mui/material/Container";
import Header from "./header";
import NationsTable from "./nationsTable";
import { memo } from "react";
import { getNations } from "../../../api/nations/queries";
import { useLatestSeason } from "../../../hooks/useLatestSeason";

const Nations = () => {
  const { data: nations, isLoading, isError } = getNations();
  const { startYear: latestSeason } = useLatestSeason();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!nations?.length) return <h3>No data available</h3>;

  return (
    <Container sx={{ py: 1 }}>
      <Header />
      <NationsTable nations={nations} seasonId={latestSeason} />
    </Container>
  );
};

export default memo(Nations);
