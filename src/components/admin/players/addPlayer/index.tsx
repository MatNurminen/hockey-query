import { useSnackbar } from "notistack";
import { useAddPlayer } from "../../../../api/players/mutations";
import PlayerForm from "../PlayerForm";
import type { FormValues } from "../types";
import { useLatestSeason } from "../../../../hooks/useLatestSeason";

export interface AddPlayerDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddPlayer = ({ open, onClose }: AddPlayerDialogProps) => {
  const { mutateAsync: addPlayer } = useAddPlayer();
  const { enqueueSnackbar } = useSnackbar();
  const { startYear, isLoading: seasonsLoading } = useLatestSeason();

  const initialValues: FormValues = {
    first_name: "",
    last_name: "",
    jersey_number: 1,
    player_position: "",
    player_order: 1,
    birth_year: 1990,
    height: undefined,
    weight: undefined,
    start_year: startYear,
    end_year: null,
    nation_id: 1,
    draft_team_id: undefined,
  };

  const handleSave = async (values: FormValues) => {
    const result = await addPlayer({
      ...values,
      end_year: values.end_year ?? undefined,
      draft_team_id: values.draft_team_id ?? undefined,
    });
    enqueueSnackbar(
      `Player added successfully with name: ${result.last_name}`,
      { variant: "success" },
    );
  };

  return (
    <PlayerForm
      open={open}
      onClose={onClose}
      title="Add Player"
      initialValues={initialValues}
      maxYear={startYear}
      seasonsLoading={seasonsLoading}
      enableReinitialize
      onSave={handleSave}
    />
  );
};

export default AddPlayer;
