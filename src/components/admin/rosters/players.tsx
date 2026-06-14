import { useState } from "react";
import Paper from "@mui/material/Paper";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import Link from "@mui/material/Link";
import TableFlag from "../../common/Images/tableFlag";
import ClubHeader from "./clubHeader";
import AppButton from "../../common/Buttons/appButton";
import {
  useDeletePlayerTournament,
  useUpdatePlayerTournament,
} from "../../../api/players-tournaments/mutations";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TPlayerStatDetail } from "../../../api/players-stats/types";
import { TStandings } from "../../../api/teams-stats/types";

interface Props {
  players: TPlayerStatDetail[];
  teams: TStandings[];
}

const Players = ({ players: initialPlayers, teams }: Props) => {
  const [searchParams] = useSearchParams();
  const leagueId = Number(searchParams.get("league"));
  const seasonId = Number(searchParams.get("season"));

  const [updatedCells, setUpdatedCells] = useState<Set<string>>(new Set());

  const { mutateAsync: updatePlayerTournament } = useUpdatePlayerTournament(
    leagueId,
    seasonId,
  );
  const { mutate: deletePlayerTournament } = useDeletePlayerTournament(
    leagueId,
    seasonId,
  );

  const handleDelete = (id: number) => {
    deletePlayerTournament({ id });
  };

  const handleProcessRowUpdate = async (
    newRow: TPlayerStatDetail,
    oldRow: TPlayerStatDetail,
  ) => {
    const changedFields = (
      Object.keys(newRow) as (keyof TPlayerStatDetail)[]
    ).filter((key) => key !== "id" && newRow[key] !== oldRow[key]);

    if (changedFields.length === 0) return oldRow;

    await updatePlayerTournament({
      id: newRow.id,
      teams_tournament_id: newRow.teams_tournament_id,
      player_id: newRow.player_id,
      games: newRow.games || 0,
      goals: newRow.goals || 0,
      postseason: newRow.postseason,
    });

    setUpdatedCells((prev) => {
      const next = new Set(prev);
      changedFields.forEach((field) => next.add(`${newRow.id}-${field}`));
      return next;
    });

    return newRow;
  };

  const columns: GridColDef<(typeof initialPlayers)[number]>[] = [
    {
      headerClassName: "header-bc",
      field: "jersey_number",
      headerName: "#",
      sortable: false,
      width: 80,
      align: "center",
      headerAlign: "center",
    },
    {
      headerClassName: "header-bc",
      field: "player_position",
      headerName: "POS",
      align: "center",
      headerAlign: "center",
      width: 80,
    },
    {
      headerClassName: "header-bc",
      field: "fullName",
      headerName: "NAME",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {params.row.player_flag && (
            <TableFlag alt="" src={params.row.player_flag} />
          )}
          <Link
            underline="hover"
            component={RouterLink}
            to={`/players/${params.row.player_id}`}
          >
            {params.row.first_name} {params.row.last_name}
          </Link>
          {Array.isArray(initialPlayers) &&
            initialPlayers.length > 0 &&
            initialPlayers[0].type_id === 2 &&
            (params.row.club_name ? `/${params.row.club_name}/` : "No club")}
        </div>
      ),
    },
    {
      headerClassName: "header-bc",
      field: "games",
      headerName: "GP",
      editable: true,
      align: "center",
      headerAlign: "center",
      width: 80,
    },
    {
      headerClassName: "header-bc",
      field: "goals",
      headerName: "G",
      editable: true,
      align: "center",
      headerAlign: "center",
      width: 80,
    },
    {
      headerClassName: "header-bc",
      field: "postseason",
      headerName: "POSTSEASON",
      editable: true,
      flex: 1,
    },
    {
      headerClassName: "header-bc",
      field: "delete",
      headerName: "",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <AppButton
            text="Delete"
            color="error"
            size="small"
            onClick={() => {
              handleDelete(Number(params.row.id));
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <Paper>
      {teams
        .sort((a: TStandings, b: TStandings) =>
          a.full_name.localeCompare(b.full_name),
        )
        .map((team: TStandings) => (
          <div key={team.id}>
            <ClubHeader
              teamTournamentId={team.id}
              leagueId={leagueId}
              seasonId={seasonId}
              team={team.full_name}
              logo={team.logo}
            />
            <DataGrid
              rows={initialPlayers
                .filter(
                  (player: TPlayerStatDetail) =>
                    player.team_id === team.team_id,
                )
                .sort(
                  (a: TPlayerStatDetail, b: TPlayerStatDetail) =>
                    a.player_order - b.player_order,
                )}
              columns={columns}
              hideFooter
              disableColumnMenu
              columnHeaderHeight={40}
              rowHeight={40}
              processRowUpdate={handleProcessRowUpdate}
              localeText={{ noRowsLabel: "No players" }}
              getCellClassName={(params) => {
                const key = `${params.id}-${params.field}`;
                return updatedCells.has(key) ? "updated-cell" : "";
              }}
              sx={{
                "& .header-bc": {
                  backgroundColor: "#093f56",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: "#fff",
                  fontSize: "17px",
                },
                "& .MuiDataGrid-columnSeparator": {
                  visibility: "hidden",
                },
                "& .MuiDataGrid-columnHeader:focus-within .MuiDataGrid-sortIcon, \
                & .MuiDataGrid-columnHeader:hover .MuiDataGrid-sortIcon": {
                  color: "#fff",
                },
                "& .updated-cell": {
                  backgroundColor: "#d0ffd0",
                  fontWeight: "medium",
                  fontStyle: "italic",
                },
              }}
            />
          </div>
        ))}
    </Paper>
  );
};

export default Players;
