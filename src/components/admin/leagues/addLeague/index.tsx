import { useSnackbar } from "notistack";
import { useLatestSeason } from "../../../../hooks/useLatestSeason";
import { useAddLeague } from "../../../../api/leagues/mutations";
import { TCreateLeagueLogoDto } from "../../../../api/league-logos/types";
import LeagueForm from "../LeagueForm";
import type { FormValues } from "../types";

const noImage = import.meta.env.VITE_CG_NO_IMAGE;

export interface AddLeagueDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddLeague = ({ open, onClose }: AddLeagueDialogProps) => {
  const { mutateAsync: addLeague } = useAddLeague();
  const { enqueueSnackbar } = useSnackbar();
  const { startYear, isLoading: seasonsLoading } = useLatestSeason();

  const initialValues: FormValues = {
    name: "",
    short_name: "",
    color: null,
    start_year: startYear,
    end_year: null,
    type_id: 1,
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
    preparedLogos: TCreateLeagueLogoDto[],
  ) => {
    const result = await addLeague({
      name: values.name,
      short_name: values.short_name,
      color: values.color,
      start_year: values.start_year,
      end_year: values.end_year,
      type_id: values.type_id,
      logos: preparedLogos,
    });
    enqueueSnackbar(`League added successfully with name: ${result.name}`, {
      variant: "success",
    });
  };

  return (
    <LeagueForm
      open={open}
      onClose={onClose}
      title="Add League"
      initialValues={initialValues}
      maxYear={startYear}
      seasonsLoading={seasonsLoading}
      enableReinitialize
      onSave={handleSave}
    />
  );
};

export default AddLeague;
