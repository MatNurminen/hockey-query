import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import LinkRoute from "../../common/LinkRoute";
import AppButton from "../../common/Buttons/appButton";
import Stack from "@mui/material/Stack";
import { useDeleteLeague } from "../../../api/leagues/mutations";
import { memo, useState } from "react";
import DeleteDialog from "../../common/Dialogs/deleteDialog";
import type { TLeagueDto } from "../../../api/leagues/types";
import TableHeader from "../../common/Table/tableHeader";
import type { Cell } from "../../common/Table/types";
import SectionChapter from "../../common/Sections/sectionChapter";
import Box from "@mui/material/Box";

interface Props {
  leagues: TLeagueDto[];
  seasonId: number;
}

const leagueModes = [
  {
    title: "Europe",
    condition: (league: TLeagueDto) =>
      league.type_id === 1 &&
      league.short_name !== "NHL" &&
      league.short_name !== "AHL",
  },
  {
    title: "North America",
    condition: (league: TLeagueDto) =>
      league.short_name === "NHL" || league.short_name === "AHL",
  },
  {
    title: "International",
    condition: (league: TLeagueDto) => league.type_id === 2,
  },
  {
    title: "Tournaments",
    condition: (league: TLeagueDto) => league.type_id === 3,
  },
];

const headerCells: Cell[] = [
  { align: "center", text: "Logo" },
  { text: "Name" },
  { text: "Short Name" },
  { text: "", sx: { display: { xs: "none", sm: "table-cell" } } },
];

const LeaguesTable = ({ leagues, seasonId }: Props) => {
  const [selectedLeague, setSelectedLeague] = useState<TLeagueDto | null>(null);
  const { mutate: deleteLeague } = useDeleteLeague();
  const seasonQuery = seasonId ? `?season=${seasonId}` : "";

  const handleOpen = (league: TLeagueDto) => {
    setSelectedLeague(league);
  };

  const handleClose = () => {
    setSelectedLeague(null);
  };

  const handleDelete = () => {
    if (selectedLeague) {
      deleteLeague({ id: selectedLeague.id });
    }
  };

  return (
    <Stack spacing={3}>
      <DeleteDialog
        open={Boolean(selectedLeague)}
        onClose={handleClose}
        name={selectedLeague?.name ?? ""}
        onConfirm={handleDelete}
      />
      {leagueModes.map((mode) => {
        const items = leagues.filter(mode.condition);
        if (!items.length) return null;
        return (
          <Box key={mode.title}>
            <SectionChapter content={mode.title} />
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableHeader
                    cells={headerCells}
                    background="secondary.main"
                    row
                  />
                </TableHead>
                <TableBody>
                  {items.map((league) => (
                    <TableRow key={league.id}>
                      <TableCell align="center">
                        <img
                          height={30}
                          alt=""
                          src={league.logos.at(-1)?.logo}
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <LinkRoute to={`/leagues/${league.id}${seasonQuery}`}>
                          {league.name}
                        </LinkRoute>
                      </TableCell>
                      <TableCell>{league.short_name}</TableCell>
                      <TableCell
                        align="right"
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        <AppButton
                          text="Delete"
                          size="small"
                          color="error"
                          iconName="delete"
                          onClick={() => handleOpen(league)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </Stack>
  );
};

export default memo(LeaguesTable);
