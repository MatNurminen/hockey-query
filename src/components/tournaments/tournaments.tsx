import { memo, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { getTournamentsByLeague } from "../../api/tournaments/queries";
import HeaderMain from "../common/Table/headerMain";
import HeaderSection from "../common/Table/headerSection";
import { useDeleteTournament } from "../../api/tournaments/mutations";
import AppButton from "../common/Buttons/appButton";
import DeleteDialog from "../common/Dialogs/deleteDialog";
import TableFlag from "../common/Images/tableFlag";
import Box from "@mui/material/Box";
import LinkRoute from "../common/LinkRoute";
import { TTournamentByLeagueDto } from "../../api/tournaments/types";

interface Props {
  leagueId: number;
}

const TournamentsByLeague = ({ leagueId }: Props) => {
  const [selectedTournament, setSelectedTournament] =
    useState<TTournamentByLeagueDto | null>(null);
  const {
    data: tournaments,
    isLoading,
    isError,
  } = getTournamentsByLeague(leagueId);
  const { mutate: deleteTournament } = useDeleteTournament(leagueId);

  if (isError) return <p>Error</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!tournaments || tournaments.length === 0)
    return <h3>No data available</h3>;

  const handleOpen = (tournament: TTournamentByLeagueDto) => {
    setSelectedTournament(tournament);
  };

  const handleClose = () => {
    setSelectedTournament(null);
  };

  const handleDelete = () => {
    if (selectedTournament) {
      deleteTournament(
        { id: selectedTournament.id },
        {
          onSuccess: () => setSelectedTournament(null),
        },
      );
    }
  };

  return (
    <>
      <DeleteDialog
        open={Boolean(selectedTournament)}
        onClose={handleClose}
        name={
          selectedTournament
            ? `${selectedTournament.season} ${selectedTournament.league} tournament`
            : ""
        }
        onConfirm={handleDelete}
      />
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table size="small">
          <HeaderMain cells={[{ text: "tournaments", colSpan: 5 }]} />
          <HeaderSection
            cells={[
              { align: "center", text: "ID" },
              { align: "center", text: "Season" },
              { text: "League" },
              { text: "" },
              { text: "" },
            ]}
          />
          <TableBody>
            {tournaments.map((tournament) => (
              <TableRow key={tournament.id}>
                <TableCell align="center">{tournament.id}</TableCell>
                <TableCell align="center">{tournament.season}</TableCell>
                <TableCell sx={{ minWidth: 200 }}>
                  <LinkRoute
                    to={`/leagues/${tournament.league_id}?season=${tournament.season_id}`}
                  >
                    <Box display="flex" alignItems="center">
                      <Box display="flex" sx={{ mr: 1 }}>
                        <TableFlag alt="" src={tournament.logo} />
                      </Box>
                      {tournament.league}
                    </Box>
                  </LinkRoute>
                </TableCell>
                <TableCell align="right">
                  <AppButton
                    text="Edit"
                    size="small"
                    iconName="edit"
                    color="success"
                    sx={{ display: { xs: "none", md: "inline-flex" } }}
                    to={`/tournaments/${tournament.id}?league=${leagueId}`}
                  />
                </TableCell>
                <TableCell align="center">
                  <AppButton
                    text="Delete"
                    size="small"
                    color="error"
                    iconName="delete"
                    onClick={() => {
                      handleOpen(tournament);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(TournamentsByLeague);
