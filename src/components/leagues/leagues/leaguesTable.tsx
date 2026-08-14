import TableContainer from "@mui/material/TableContainer";
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
import { TLeagueDto } from "../../../api/leagues/types";
import HeaderMain from "../../common/Table/headerMain";
import HeaderSection from "../../common/Table/headerSection";

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
      {leagueModes.map((mode) => (
        <TableContainer component={Paper} key={mode.title}>
          <Table size="small">
            <HeaderMain cells={[mode.title]} />
          </Table>
          <Table size="small">
            <HeaderSection
              cells={[
                { align: "center", text: "Logo" },
                { text: "Name" },
                { text: "Short Name" },
                { text: "" },
              ]}
            />
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
                    <LinkRoute to={`/leagues/${league.id}?season=${seasonId}`}>
                      {league.name}
                    </LinkRoute>
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
