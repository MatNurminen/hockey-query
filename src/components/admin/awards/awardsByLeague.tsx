import { memo, useState } from "react";
import { TLeagueDto } from "../../../api/leagues/types";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import HeaderMain from "../../common/Table/headerMain";
import HeaderSection from "../../common/Table/headerSection";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import AppButton from "../../common/Buttons/appButton";
import DeleteDialog from "../../common/Dialogs/deleteDialog";
import { TAwardDto } from "../../../api/awards/types";
import {
  nameDuplicate,
  hasDuplicateAwardName,
  useDeleteAward,
  useUpdateAward,
} from "../../../api/awards/mutations";

interface Props {
  league: TLeagueDto;
}

const AwardsByLeague = ({ league }: Props) => {
  const [selectedAward, setSelectedAward] = useState<TAwardDto | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editError, setEditError] = useState<string | null>(null);
  const { mutate: deleteAward } = useDeleteAward(league.id);
  const { mutate: updateAward, isPending: isUpdating } = useUpdateAward(
    league.id,
  );

  const duplicateNameError =
    editingId !== null && hasDuplicateAwardName(league, editingName, editingId)
      ? nameDuplicate
      : undefined;
  const editNameError = duplicateNameError ?? editError;

  const handleEditStart = (award: TAwardDto) => {
    setEditingId(award.id);
    setEditingName(award.name);
    setEditError(null);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName("");
    setEditError(null);
  };

  const handleEditNameChange = (value: string) => {
    setEditingName(value);
    setEditError(null);
  };

  const handleEditSave = (award: TAwardDto) => {
    const name = editingName.trim();
    if (!name) {
      setEditError("Name of award is required");
      return;
    }

    if (hasDuplicateAwardName(league, name, award.id)) {
      return;
    }

    updateAward(
      { id: award.id, league_id: award.league_id, name },
      { onSuccess: handleEditCancel },
    );
  };

  const handleOpen = (award: TAwardDto) => {
    setSelectedAward(award);
  };

  const handleClose = () => {
    setSelectedAward(null);
  };

  const handleDelete = () => {
    if (selectedAward) {
      deleteAward(
        { id: selectedAward.id },
        {
          onSuccess: () => setSelectedAward(null),
        },
      );
    }
  };

  return (
    <>
      <DeleteDialog
        open={Boolean(selectedAward)}
        onClose={handleClose}
        name={
          selectedAward ? `${selectedAward.id} ${selectedAward.name} award` : ""
        }
        onConfirm={handleDelete}
      />
      <TableContainer component={Paper} sx={{ my: 4 }}>
        <Table size="small">
          <HeaderMain cells={[{ text: `${league.name} awards`, colSpan: 5 }]} />
          <HeaderSection
            cells={[
              { align: "center", text: "ID" },
              { text: "award" },
              { text: "" },
            ]}
          />
          <TableBody>
            {league.awards?.map((award) => (
              <TableRow key={award.id}>
                <TableCell align="center">{award.id}</TableCell>
                <TableCell>
                  {editingId === award.id ? (
                    <TextField
                      fullWidth
                      autoFocus
                      size="small"
                      variant="outlined"
                      sx={{ bgcolor: "background.paper" }}
                      value={editingName}
                      onChange={(e) => handleEditNameChange(e.target.value)}
                      disabled={isUpdating}
                      error={Boolean(editNameError)}
                      helperText={editNameError ?? undefined}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleEditSave(award);
                        if (e.key === "Escape") handleEditCancel();
                      }}
                    />
                  ) : (
                    award.name
                  )}
                </TableCell>
                <TableCell align="right">
                  {editingId === award.id ? (
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <AppButton
                        text="Save"
                        size="small"
                        color="success"
                        iconName="save"
                        disabled={isUpdating || Boolean(editNameError)}
                        onClick={() => handleEditSave(award)}
                      />
                      <AppButton
                        text="Cancel"
                        size="small"
                        color="inherit"
                        iconName="cancel"
                        disabled={isUpdating}
                        onClick={handleEditCancel}
                      />
                    </Stack>
                  ) : (
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <AppButton
                        text="Edit"
                        color="success"
                        size="small"
                        iconName="edit"
                        onClick={() => handleEditStart(award)}
                      />
                      <AppButton
                        text="Delete"
                        size="small"
                        color="error"
                        iconName="delete"
                        onClick={() => {
                          handleOpen(award);
                        }}
                      />
                    </Stack>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(AwardsByLeague);
