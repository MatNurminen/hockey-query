import { useEffect, useState, useMemo, useRef } from "react";
import { formatSeason } from "../../utils/formatSeason";
import { getStandings } from "../../../api/teams-stats/queries";
import TableFlag from "../../common/Images/tableFlag";
import AppButton from "../../common/Buttons/appButton";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useUpdateTeamTournament } from "../../../api/teams-tournaments/mutations";
import Paper from "@mui/material/Paper";
import { TStandings } from "../../../api/teams-stats/types";
import { TCreateTeamTournamentDto } from "../../../api/teams-tournaments/types";
import SectionChapter from "../../common/Sections/sectionChapter";
import LinkRoute from "../../common/LinkRoute";

interface Props {
  leagueId: number;
  seasonId: number;
  title: string;
}

const columns: GridColDef<TStandings>[] = [
  {
    field: "rank",
    headerName: "#",
    width: 50,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "fullName",
    headerName: "TEAM",
    flex: 1,
    sortable: false,
    minWidth: 200,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {params.row.logo && <TableFlag alt="" src={params.row.logo} />}
        <LinkRoute to={`/teams/${params.row.team_id}`}>
          {params.row.full_name}
        </LinkRoute>
      </div>
    ),
  },
  {
    field: "games",
    headerName: "GP",
    editable: true,
    align: "center",
    headerAlign: "center",
    width: 60,
  },
  {
    field: "wins",
    headerName: "W",
    editable: true,
    align: "center",
    headerAlign: "center",
    width: 60,
  },
  {
    field: "ties",
    headerName: "T",
    editable: true,
    align: "center",
    headerAlign: "center",
    width: 60,
  },
  {
    field: "losts",
    headerName: "L",
    editable: true,
    align: "center",
    headerAlign: "center",
    width: 60,
  },
  {
    field: "goals_for",
    headerName: "GF",
    editable: true,
    align: "center",
    headerAlign: "center",
    width: 60,
  },
  {
    field: "goals_against",
    headerName: "GA",
    editable: true,
    align: "center",
    headerAlign: "center",
    width: 60,
  },
  {
    field: "gd",
    headerName: "+/-",
    align: "center",
    headerAlign: "center",
    width: 60,
  },
  {
    field: "pts",
    headerName: "PTS",
    align: "center",
    headerAlign: "center",
    width: 60,
  },
  {
    field: "postseason",
    headerName: "POSTSEASON",
    editable: true,
    flex: 1,
    minWidth: 200,
    valueGetter: (_value, row) => row.postseason?.award ?? "",
    valueSetter: (newValue, row) => {
      const newRow = { ...row };
      newRow.postseason = newValue ? { award: String(newValue) } : null;
      return newRow;
    },
    renderCell: (params) => (
      <span>{String(params.row.postseason?.award ?? "") || "-"}</span>
    ),
  },
];

const Standings = ({ leagueId, seasonId, title }: Props) => {
  const {
    data: teams = [],
    isError,
    isLoading,
  } = getStandings({ leagueId: [leagueId], seasonId });

  const [teamsState, setTeamsState] = useState<TStandings[]>([]);
  const [updatedCells, setUpdatedCells] = useState<Set<string>>(new Set());
  const prevParamsRef = useRef<string | null>(null);

  const { mutateAsync: updateTeamTournament } = useUpdateTeamTournament();

  useEffect(() => {
    const currentKey = `${leagueId}-${seasonId}`;
    if (!isLoading && currentKey !== prevParamsRef.current) {
      prevParamsRef.current = currentKey;
      setTeamsState(teams);
      setUpdatedCells(new Set());
    }
  }, [teams, leagueId, seasonId, isLoading]);

  const rowsWithRank = useMemo(() => {
    const sortedTeams = [...teamsState].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      return b.gd - a.gd;
    });
    return sortedTeams.map((team, index) => ({
      ...team,
      rank: index + 1,
    }));
  }, [teamsState]);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;

  const handleProcessRowUpdate = async (
    newRow: TStandings,
    oldRow: TStandings,
  ) => {
    const toNumber = (val: unknown) => Number(val) || 0;

    const updatedRow = {
      ...newRow,
      games: toNumber(newRow.games),
      wins: toNumber(newRow.wins),
      ties: toNumber(newRow.ties),
      losts: toNumber(newRow.losts),
      goals_for: toNumber(newRow.goals_for),
      goals_against: toNumber(newRow.goals_against),
    };

    updatedRow.pts = updatedRow.wins * 2 + updatedRow.ties;
    updatedRow.gd = updatedRow.goals_for - updatedRow.goals_against;

    const changedFields = (
      Object.keys(updatedRow) as (keyof TStandings)[]
    ).filter((key) => key !== "id" && updatedRow[key] !== oldRow[key]);

    if (changedFields.length === 0) return oldRow;

    const numericKeys = [
      "games",
      "wins",
      "ties",
      "losts",
      "goals_for",
      "goals_against",
    ] as const;
    const payload: TCreateTeamTournamentDto & { id: number } = {
      id: updatedRow.id,
      tournament_id: updatedRow.tournament_id,
      team_id: updatedRow.team_id,
    };
    for (const key of numericKeys) {
      if (changedFields.includes(key)) {
        payload[key] = updatedRow[key];
      }
    }
    if (changedFields.includes("postseason")) {
      payload.postseason = updatedRow.postseason;
    }
    await updateTeamTournament(payload);

    setTeamsState((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row)),
    );

    setUpdatedCells((prev) => {
      const next = new Set(prev);
      changedFields.forEach((field) => next.add(`${updatedRow.id}-${field}`));
      if (updatedRow.pts !== oldRow.pts) next.add(`${updatedRow.id}-pts`);
      if (updatedRow.gd !== oldRow.gd) next.add(`${updatedRow.id}-gd`);
      return next;
    });

    return updatedRow;
  };

  return (
    <>
      <Paper>
        <SectionChapter content={`${formatSeason(seasonId)} ${title} Standings`} />
        <DataGrid
          rows={rowsWithRank}
          columns={columns}
          getRowId={(row) => row.id}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={36}
          rowHeight={36}
          processRowUpdate={handleProcessRowUpdate}
          onProcessRowUpdateError={() => {}}
          getCellClassName={(params) => {
            const key = `${params.id}-${params.field}`;
            const row = params.row;

            const mismatch =
              row.games !== row.wins + row.ties + row.losts &&
              params.field === "games";

            if (mismatch) return "error-cell";
            if (updatedCells.has(key)) return "updated-cell";

            return "";
          }}
          sx={(theme) => ({
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: theme.palette.secondary.main,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: theme.palette.common.white,
              fontSize: "16px",
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            "& .MuiDataGrid-columnHeader:focus-within .MuiDataGrid-sortIcon, \
                & .MuiDataGrid-columnHeader:hover .MuiDataGrid-sortIcon": {
              color: theme.palette.common.white,
            },
            "& .updated-cell": {
              backgroundColor: `${theme.palette.extra.updatedCellBG} !important`,
              fontWeight: "medium",
              fontStyle: "italic",
            },
            "& .error-cell": {
              backgroundColor: `${theme.palette.extra.errorCellBG} !important`,
            },
            "& .MuiDataGrid-cell": {
              backgroundColor: "inherit",
            },
            "& .MuiDataGrid-row": {
              backgroundColor: "inherit",
            },
          })}
        />
      </Paper>
      <AppButton
        fullWidth
        text="Show Rosters"
        color="success"
        to={`/rosters?league=${leagueId}&season=${seasonId}`}
      />
    </>
  );
};

export default Standings;
