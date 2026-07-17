import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useUpdateTeam } from "../../../../api/teams/mutations";
import { getTeam } from "../../../../api/teams/queries";
import { TCreateTeamLogoDto } from "../../../../api/team-logos/types";
import { useLatestSeason } from "../../../../hooks/useLatestSeason";
import TeamForm from "../TeamForm";
import type { FormValues } from "../types";

export interface UpdateTeamDialogProps {
  open: boolean;
  onClose: () => void;
  teamId: number;
}

const UpdateTeam = ({ open, onClose, teamId }: UpdateTeamDialogProps) => {
  const { mutateAsync: updateTeam } = useUpdateTeam();
  const { enqueueSnackbar } = useSnackbar();
  const { data: team, isError, isLoading } = getTeam(teamId);
  const { startYear } = useLatestSeason();

  const initialValues: FormValues = team
    ? {
        full_name: team.full_name,
        name: team.name,
        short_name: team.short_name,
        start_year: team.start_year,
        end_year: team?.end_year ?? null,
        nation_id: team.nation_id,
        logos: team.logos as FormValues["logos"],
      }
    : {
        full_name: "",
        name: "",
        short_name: "",
        start_year: startYear,
        end_year: null,
        nation_id: 1,
        logos: [],
      };

  const handleSave = async (
    values: FormValues,
    preparedLogos: TCreateTeamLogoDto[],
  ) => {
    await updateTeam({
      id: teamId,
      full_name: values.full_name,
      name: values.name,
      short_name: values.short_name,
      start_year: values.start_year,
      end_year: values.end_year,
      nation_id: values.nation_id,
      logos: preparedLogos,
    });
    enqueueSnackbar("Team saved successfully.", { variant: "success" });
  };

  if (!team || isLoading || isError) {
    return (
      <Dialog open={open} disableRestoreFocus onClose={() => {}}>
        <DialogContent>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Box sx={{ p: 2, color: "error.main" }}>Error loading team data</Box>
          ) : (
            <Box sx={{ p: 2 }}>No data available</Box>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <TeamForm
      open={open}
      onClose={onClose}
      title="Edit Team"
      initialValues={initialValues}
      enableReinitialize
      teamIdForLogo={team.id}
      maxYear={startYear}
      onSave={handleSave}
    />
  );
};

export default UpdateTeam;
