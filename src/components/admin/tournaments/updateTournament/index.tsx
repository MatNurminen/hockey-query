import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Header from "./header";
import ListAllTeams from "./listAllTeams";
import ListTournamentTeams from "./listTournamentTeams";
import Stack from "@mui/material/Stack";
import GreenButton from "../../../common/Buttons/greenButton";
import AppButton from "../../../common/Buttons/appButton";
import {
  useAddTeamTournament,
  useDeleteTeamTournament,
} from "../../../../api/teams-tournaments/mutations";
import { getTournament } from "../../../../api/tournaments/queries";

const Tournament = () => {
  const [checked, setChecked] = useState<readonly number[]>([]);
  const params = useParams();
  const [searchParams] = useSearchParams();
  const tournamentId: number = Number(params.id);
  const leagueId: number | undefined = searchParams.has("league")
    ? Number(searchParams.get("league"))
    : undefined;
  const { data: tournament, isLoading, isError } = getTournament(tournamentId);

  const { mutateAsync: addTeamTournament } = useAddTeamTournament(tournamentId);
  const { mutateAsync: deleteTeamTournament } =
    useDeleteTeamTournament(tournamentId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!tournament) return <p>No data available</p>;

  const handleToggle = (value: number) => () => {
    setChecked((prev) => (prev[0] === value ? [] : [value]));
  };

  const handleCheckedRemove = async (id: number) => {
    if (!Number.isFinite(id)) return;
    await deleteTeamTournament({ id });
    setChecked([]);
  };

  const handleCheckedAdd = async (id: number) => {
    if (!Number.isFinite(id)) return;
    await addTeamTournament({
      tournament_id: tournamentId,
      team_id: id,
    });
    setChecked([]);
  };

  return (
    <Container>
      <Header tournament={tournament} leagueId={leagueId} />
      <Grid container alignItems="center" mt={-3}>
        <Grid size={{ xs: 5 }}>
          <ListAllTeams handleToggle={handleToggle} checked={checked} />
        </Grid>
        <Grid size={{ xs: 2 }}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <GreenButton
              text=">"
              size="small"
              onClick={() => {
                handleCheckedAdd(Number(checked[0]));
              }}
              iconIndex={0}
            />
            <AppButton
              text="<"
              size="small"
              color="error"
              iconName="remove"
              onClick={() => {
                handleCheckedRemove(Number(checked[0]));
              }}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 5 }} mt={9}>
          <ListTournamentTeams
            tournamentId={tournamentId}
            handleToggle={handleToggle}
            checked={checked}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tournament;
