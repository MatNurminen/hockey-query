import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useUpdatePlayer } from "../../../../api/players/mutations";
import { getPlayer } from "../../../../api/players/queries";
import PlayerForm from "../PlayerForm";
import type { FormValues } from "../types";
import { useLatestSeason } from "../../../../hooks/useLatestSeason";

export interface UpdatePlayerDialogProps {
  open: boolean;
  onClose: () => void;
  playerId: number;
}

const UpdatePlayer = ({ open, onClose, playerId }: UpdatePlayerDialogProps) => {
  const { mutateAsync: updatePlayer } = useUpdatePlayer();
  const { data: player, isError, isLoading } = getPlayer(playerId);
  const { startYear } = useLatestSeason();

  const initialValues: FormValues = {
    first_name: player?.first_name ?? "",
    last_name: player?.last_name ?? "",
    jersey_number: player?.jersey_number ?? 1,
    player_position: player?.player_position ?? "",
    player_order: player?.player_order ?? 1,
    birth_year: player?.birth_year ?? 1990,
    height: player?.height ?? undefined,
    weight: player?.weight ?? undefined,
    start_year: player?.start_year ?? startYear,
    end_year: player?.end_year ?? null,
    nation_id: player?.nation_id ?? 1,
    draft_team_id: player?.draft_team_id ?? undefined,
  };

  const handleSave = async (values: FormValues) => {
    await updatePlayer({
      id: playerId,
      ...values,
      end_year: values.end_year ?? undefined,
      draft_team_id: values.draft_team_id ?? undefined,
    });
  };

  if (isLoading) {
    return (
      <Dialog open={open} disableRestoreFocus onClose={() => {}}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (isError) {
    return (
      <Dialog open={open} disableRestoreFocus onClose={() => {}}>
        <DialogContent>
          <Box sx={{ p: 2, color: "error.main" }}>
            Error loading player data
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (!player) {
    return (
      <Dialog open={open} disableRestoreFocus onClose={() => {}}>
        <DialogContent>
          <Box sx={{ p: 2 }}>No data available</Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <PlayerForm
      open={open}
      onClose={onClose}
      title="Edit Player"
      initialValues={initialValues}
      enableReinitialize
      maxYear={startYear}
      onSave={handleSave}
    />
  );
};

export default UpdatePlayer;
