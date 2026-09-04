import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import AppButton from "../../common/Buttons/appButton";
import Stack from "@mui/material/Stack";
import { memo, useState } from "react";
import DeleteDialog from "../../common/Dialogs/deleteDialog";
import TableFlag from "../../common/Images/tableFlag";
import { useDeleteNation } from "../../../api/nations/mutations";
import { TNationDto } from "../../../api/nations/types";
import type { Cell } from "../../common/Table/types";
import TableHeader from "../../common/Table/tableHeader";
import LinkRoute from "../../common/LinkRoute";

interface Props {
  nations: TNationDto[];
  seasonId: number;
}

const headerCells: Cell[] = [
  { align: "center", text: "Flag" },
  { text: "Name" },
  { text: "Short Name" },
  { text: "", sx: { display: { xs: "none", sm: "table-cell" } } },
];

const NationsTable = ({ nations, seasonId }: Props) => {
  const [selectedNation, setSelectedNation] = useState<number | null>(null);
  const [name, setName] = useState("");

  const { mutate: deleteNation } = useDeleteNation();

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
          <TableHeader cells={headerCells} background="secondary.main" />
          <TableBody>
            {nations.map((nation: TNationDto) => (
              <TableRow key={nation.id}>
                <TableCell align="center">
                  <TableFlag alt={nation.name} src={nation.flag} />
                </TableCell>
                <TableCell>
                  <LinkRoute
                    underline="hover"
                    to={`/nations/${nation.id}?season=${seasonId}`}
                  >
                    {nation.name}
                  </LinkRoute>
                </TableCell>
                <TableCell>{nation.short_name}</TableCell>
                <TableCell
                  align="right"
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
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
