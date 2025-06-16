import { useEffect, useState, useMemo } from 'react';
import HeaderMain from '../../common/Table/headerMain';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import {
  getPrefetchStandings,
  getStandings,
} from '../../../api/teams-stats/queries';
import TableFlag from '../../common/Images/tableFlag';
import Box from '@mui/material/Box';
import GreenButton from '../../common/Buttons/greenButton';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useUpdateTeamTournament } from '../../../api/teams-tournaments/mutations';
import Paper from '@mui/material/Paper';

const Standings = ({ leagueId, seasonId, title }: any) => {
  getPrefetchStandings(leagueId, seasonId - 1);

  const {
    data: teams = [],
    isError,
    isLoading,
  } = getStandings({ leagueId, seasonId });

  const [teamsState, setTeamsState] = useState(teams);
  const [updatedCells, setUpdatedCells] = useState<Set<string>>(new Set());

  const { mutateAsync: updateTeamTournament } = useUpdateTeamTournament();

  useEffect(() => {
    if (
      teams.length !== teamsState.length ||
      teams.some((team, i) => team.id !== teamsState[i]?.id)
    ) {
      setTeamsState(teams);
      setUpdatedCells(new Set());
    }
  }, [teams]);

  const rowsWithRank = useMemo(() => {
    const sortedTeams = [...teamsState].sort((a, b) => {
      if (b.pts !== a.pts) return b.pts - a.pts;
      return b.gd - a.gd;
    });
    return sortedTeams.map((team, index) => ({
      ...team,
      key: index + 1,
    }));
  }, [teamsState]);

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!teams) return <h3>No data available</h3>;

  const handleProcessRowUpdate = async (newRow: any, oldRow: any) => {
    const toNumber = (val: any) => Number(val) || 0;

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

    const changedFields = Object.keys(updatedRow).filter(
      (key) => key !== 'id' && key !== 'key' && updatedRow[key] !== oldRow[key]
    );

    if (changedFields.length === 0) return oldRow;

    await updateTeamTournament({
      id: updatedRow.id,
      tournament_id: updatedRow.tournament_id,
      team_id: updatedRow.team_id,
      games: updatedRow.games,
      wins: updatedRow.wins,
      ties: updatedRow.ties,
      losts: updatedRow.losts,
      goals_for: updatedRow.goals_for,
      goals_against: updatedRow.goals_against,
      postseason: updatedRow.postseason,
    });

    setTeamsState((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
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

  const columns: GridColDef<(typeof teams)[number]>[] = [
    {
      headerClassName: 'header-bc',
      field: 'key',
      headerName: '#',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      headerClassName: 'header-bc',
      field: 'fullName',
      headerName: 'TEAM',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {params.row.logo && <TableFlag src={params.row.logo} />}
          <Link
            underline='hover'
            component={RouterLink}
            to={`/players/${params.row.team_id}`}
          >
            {params.row.full_name}
          </Link>
        </div>
      ),
    },
    {
      headerClassName: 'header-bc',
      field: 'games',
      headerName: 'GP',
      editable: true,
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      headerClassName: 'header-bc',
      field: 'wins',
      headerName: 'W',
      editable: true,
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      headerClassName: 'header-bc',
      field: 'ties',
      headerName: 'T',
      editable: true,
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      headerClassName: 'header-bc',
      field: 'losts',
      headerName: 'L',
      editable: true,
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      headerClassName: 'header-bc',
      field: 'goals_for',
      headerName: 'GF',
      editable: true,
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      headerClassName: 'header-bc',
      field: 'goals_against',
      headerName: 'GA',
      editable: true,
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      headerClassName: 'header-bc',
      field: 'gd',
      headerName: '+/-',
      editable: true,
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      headerClassName: 'header-bc',
      field: 'pts',
      headerName: 'PTS',
      align: 'center',
      headerAlign: 'center',
      width: 80,
    },
    {
      headerClassName: 'header-bc',
      field: 'postseason',
      headerName: 'POSTSEASON',
      editable: true,
      flex: 1,
    },
  ];

  return (
    <>
      <Paper>
        <TableContainer sx={{ mb: -0.5 }}>
          <Table size='small'>
            <HeaderMain
              cells={[`${seasonId}-${seasonId - 1999} ${title} Standings`]}
            />
          </Table>
        </TableContainer>
        <DataGrid
          rows={rowsWithRank}
          columns={columns}
          getRowId={(row) => row.id}
          hideFooter
          disableColumnMenu
          columnHeaderHeight={36}
          rowHeight={36}
          processRowUpdate={handleProcessRowUpdate}
          getCellClassName={(params) => {
            const key = `${params.id}-${params.field}`;
            const row = params.row;

            const mismatch =
              row.games !== row.wins + row.ties + row.losts &&
              params.field === 'games';

            if (mismatch) return 'error-cell';
            if (updatedCells.has(key)) return 'updated-cell';

            return '';
          }}
          sx={{
            '& .header-bc': {
              backgroundColor: '#ca3136',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: '#fff',
              fontSize: '16px',
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
            '& .MuiDataGrid-columnHeader:focus-within .MuiDataGrid-sortIcon, \
                & .MuiDataGrid-columnHeader:hover .MuiDataGrid-sortIcon': {
              color: '#fff',
            },
            '& .updated-cell': {
              backgroundColor: '#d0ffd0 !important',
              fontWeight: 'medium',
              fontStyle: 'italic',
            },
            '& .error-cell': {
              backgroundColor: '#f96b52 !important',
            },
            '& .MuiDataGrid-cell': {
              backgroundColor: 'inherit',
            },
            '& .MuiDataGrid-row': {
              backgroundColor: 'inherit',
            },
          }}
        />
      </Paper>
      <Box mt={1}>
        <GreenButton
          fullWidth
          text='Show Rosters'
          to={`/rosters?league=${leagueId}&season=${seasonId}`}
        />
      </Box>
    </>
  );
};

export default Standings;
