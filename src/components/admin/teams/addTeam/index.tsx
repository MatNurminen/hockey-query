import { useSnackbar } from "notistack";
import { useAddTeam } from "../../../../api/teams/mutations";
import { useLatestSeason } from "../../../../hooks/useLatestSeason";
import { TCreateTeamLogoDto } from "../../../../api/team-logos/types";
import TeamForm from "../TeamForm";
import type { FormValues } from "../types";

const noImage = import.meta.env.VITE_CG_NO_IMAGE;

export interface AddTeamDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddTeam = ({ open, onClose }: AddTeamDialogProps) => {
  const { mutateAsync: addTeam } = useAddTeam();
  const { enqueueSnackbar } = useSnackbar();
  const { startYear, isLoading: seasonsLoading } = useLatestSeason();

  const initialValues: FormValues = {
    full_name: "",
    name: "",
    short_name: "",
    start_year: startYear,
    end_year: null,
    nation_id: 1,
    logos: [
      {
        start_year: startYear,
        end_year: null,
        logo: noImage,
      },
    ],
  };

  const handleSave = async (
    values: FormValues,
    preparedLogos: TCreateTeamLogoDto[],
  ) => {
    const result = await addTeam({
      full_name: values.full_name,
      name: values.name,
      short_name: values.short_name,
      start_year: values.start_year,
      end_year: values.end_year,
      nation_id: values.nation_id,
      logos: preparedLogos,
    });
    enqueueSnackbar(`Team added successfully with name: ${result.name}`, {
      variant: "success",
    });
  };

  return (
    <TeamForm
      open={open}
      onClose={onClose}
      title="Add Team"
      initialValues={initialValues}
      maxYear={startYear}
      seasonsLoading={seasonsLoading}
      enableReinitialize
      onSave={handleSave}
    />
  );
};

export default AddTeam;
