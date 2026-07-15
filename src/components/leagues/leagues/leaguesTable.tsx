import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import AppButton from "../../common/Buttons/appButton";
import HeaderTable from "./headerTable";
import Stack from "@mui/material/Stack";
import { useDeleteLeague } from "../../../api/leagues/mutations";
import { memo, useState } from "react";
import DeleteDialog from "../../common/Dialogs/deleteDialog";
import { TLeagueDto } from "../../../api/leagues/types";

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

const LeaguesTable = ({ leagues, seasonId }: Props) => {
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
  const [name, setName] = useState("");

  const { mutate: deleteLeague } = useDeleteLeague();

  const handleOpen = (id: number) => {
    setSelectedLeague(id);
  };

  const handleClose = () => {
    setSelectedLeague(null);
  };

  const handleDelete = () => {
    if (selectedLeague) {
      deleteLeague(
        { id: selectedLeague },
        {
          onSuccess: () => setSelectedLeague(null),
        },
      );
    }
  };

  return (
    <Stack spacing={3}>
      <DeleteDialog
        open={Boolean(selectedLeague)}
        onClose={handleClose}
        name={name}
        onConfirm={handleDelete}
      />
      {leagueModes.map((mode, index) => (
        <TableContainer component={Paper} key={index}>
          <Table size="small">
            <HeaderTable title={mode.title} />
            <TableBody>
              {leagues.filter(mode.condition).map((league) => (
                <TableRow key={league.id}>
                  <TableCell align="center">
                    <img
                      height={30}
                      alt=""
                      src={league.logos.at(-1)?.logo}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      underline="hover"
                      component={RouterLink}
                      to={`/leagues/${league.id}?season=${seasonId}`}
                    >
                      {league.name}
                    </Link>
                  </TableCell>
                  <TableCell>{league.short_name}</TableCell>
                  <TableCell align="right">
                    <AppButton
                      text="Delete"
                      size="small"
                      color="error"
                      iconName="delete"
                      onClick={() => {
                        handleOpen(league.id);
                        setName(league.name);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Stack>
  );
};

export default memo(LeaguesTable);
