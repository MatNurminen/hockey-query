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
import { memo, useState } from "react";
import DeleteDialog from "../../common/Dialogs/deleteDialog";
import TableFlag from "../../common/Images/tableFlag";
import { getNations } from "../../../api/nations/queries";
import { useDeleteNation } from "../../../api/nations/mutations";
import { TNationDto } from "../../../api/nations/types";
import { useLatestSeason } from "../../../hooks/useLatestSeason";

const NationsTable = () => {
  const [selectedNation, setSelectedNation] = useState<number | null>(null);
  const [name, setName] = useState("");

  const { data: nations, isLoading, isError } = getNations();
  const { mutate: deleteNation } = useDeleteNation();

  const { startYear: currentSeason } = useLatestSeason();

  const handleOpen = (id: number) => {
    setSelectedNation(id);
  };

  const handleClose = () => {
    setSelectedNation(null);
  };

  const handleDelete = () => {
    if (selectedNation) {
      deleteNation(
        { id: selectedNation },
        {
          onSuccess: () => setSelectedNation(null),
        },
      );
    }
  };

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!nations?.length) return <h3>No data available</h3>;

  return (
    <Stack spacing={3}>
      <DeleteDialog
        open={Boolean(selectedNation)}
        onClose={handleClose}
        name={name}
        onConfirm={handleDelete}
      />
      <TableContainer component={Paper}>
        <Table size="small">
          <HeaderTable />
          <TableBody>
            {nations.map((nation: TNationDto) => (
              <TableRow key={nation.id}>
                <TableCell align="center">
                  <TableFlag alt={nation.name} src={nation.flag} />
                </TableCell>
                <TableCell>
                  <Link
                    underline="hover"
                    component={RouterLink}
                    to={`/nations/${nation.id}?season=${currentSeason}`}
                  >
                    {nation.name}
                  </Link>
                </TableCell>
                <TableCell>{nation.short_name}</TableCell>
                <TableCell align="right">
                  <AppButton
                    text="Delete"
                    size="small"
                    color="error"
                    iconName="delete"
                    onClick={() => {
                      handleOpen(nation.id);
                      setName(nation.name);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default memo(NationsTable);
