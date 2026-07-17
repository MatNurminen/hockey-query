import { useState, useMemo, memo, useRef } from "react";
import Paper from "@mui/material/Paper";
import { Link as RouterLink } from "react-router-dom";
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

const EMPTY_ROWS: TPlayerStatDetail[] = [];

interface TeamGridProps {
  rows: TPlayerStatDetail[];
  team: TStandings;
  leagueId: number;
  seasonId: number;
}

const TeamGrid = memo(function TeamGrid({
  rows,
  team,
  leagueId,
  seasonId,
}: TeamGridProps) {
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
    });

    setUpdatedCells((prev) => {
      const next = new Set(prev);
      changedFields.forEach((field) => next.add(`${newRow.id}-${field}`));
      return next;
    });

    return newRow;
  };

  const columns: GridColDef<(typeof rows)[number]>[] = useMemo(
    () => [
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
            {rows.length > 0 &&
              rows[0].type_id === 2 &&
              (params.row.club_name
                ? `/${params.row.club_name}, ${params.row.league_name}/`
                : "/No club/")}
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
        editable: false,
        flex: 1,
      },
      {
        headerClassName: "header-bc",
        field: "delete",
        headerName: "",
        sortable: false,
        width: 120,
        renderCell: (params) => (
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
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
    ],
    [rows],
  );

  return (
    <div>
      <ClubHeader
        teamTournamentId={team.id}
        leagueId={leagueId}
        seasonId={seasonId}
        team={team.full_name}
        logo={team.logo}
      />
      <DataGrid
        rows={rows}
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
  );
});

function buildTeamRows(
  players: TPlayerStatDetail[],
  prevMap: Map<number, TPlayerStatDetail[]>,
): Map<number, TPlayerStatDetail[]> {
  const groups = new Map<number, TPlayerStatDetail[]>();
  for (const player of players) {
    const rows = groups.get(player.team_id);
    if (rows) {
      rows.push(player);
    } else {
      groups.set(player.team_id, [player]);
    }
  }

  const map = new Map<number, TPlayerStatDetail[]>();
  for (const [teamId, rows] of groups) {
    const sorted = rows.toSorted(
      (a: TPlayerStatDetail, b: TPlayerStatDetail) =>
        a.player_order - b.player_order,
    );
    const prev = prevMap.get(teamId);
    if (
      prev &&
      prev.length === sorted.length &&
      prev.every((p, i) => p.id === sorted[i].id)
    ) {
      map.set(teamId, prev);
    } else {
      map.set(teamId, sorted);
    }
  }
  return map;
}

interface Props {
  players: TPlayerStatDetail[];
  teams: TStandings[];
  leagueId: number;
  seasonId: number;
}

const Players = ({
  players: initialPlayers,
  teams,
  leagueId,
  seasonId,
}: Props) => {
  const prevMapRef = useRef<Map<number, TPlayerStatDetail[]>>(new Map());
  const teamRows = useMemo(() => {
    const map = buildTeamRows(initialPlayers, prevMapRef.current);
    prevMapRef.current = map;
    return map;
  }, [initialPlayers]);

  const sortedTeams = useMemo(
    () =>
      [...teams].toSorted((a: TStandings, b: TStandings) =>
        a.full_name.localeCompare(b.full_name),
      ),
    [teams],
  );

  return (
    <Paper>
      {sortedTeams.map((team: TStandings) => (
        <TeamGrid
          key={team.id}
          team={team}
          rows={teamRows.get(team.team_id) ?? EMPTY_ROWS}
          leagueId={leagueId}
          seasonId={seasonId}
        />
      ))}
    </Paper>
  );
};

export default Players;
