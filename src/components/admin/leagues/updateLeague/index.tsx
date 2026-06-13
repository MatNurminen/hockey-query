import { useSnackbar } from "notistack";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useLatestSeason } from "../../../../hooks/useLatestSeason";
import { useUpdateLeague } from "../../../../api/leagues/mutations";
import { getLeague } from "../../../../api/leagues/queries";
import { TCreateLeagueLogoDto } from "../../../../api/league-logos/types";
import LeagueForm from "../LeagueForm";
import type { FormValues } from "../types";

export interface UpdateLeagueDialogProps {
  open: boolean;
  onClose: () => void;
  leagueId: number;
}

const UpdateLeague = ({ open, onClose, leagueId }: UpdateLeagueDialogProps) => {
  const { mutateAsync: updateLeague } = useUpdateLeague();
  const { enqueueSnackbar } = useSnackbar();
  const { startYear } = useLatestSeason();
  const { data: league, isError, isLoading } = getLeague(leagueId);

  const initialValues: FormValues = {
    name: league?.name ?? "",
    short_name: league?.short_name ?? "",
    start_year: league?.start_year ?? startYear,
    end_year: league?.end_year ?? null,
    color: league?.color ?? null,
    type_id: league?.type_id ?? 1,
    logos: (league?.logos as FormValues["logos"] | undefined) ?? [],
  };

  const handleSave = async (
    values: FormValues,
    preparedLogos: TCreateLeagueLogoDto[],
  ) => {
    await updateLeague({
      id: leagueId,
      name: values.name,
      short_name: values.short_name,
      color: values.color,
      start_year: values.start_year,
      end_year: values.end_year,
      type_id: values.type_id,
      logos: preparedLogos,
    });
    enqueueSnackbar("League saved successfully.", { variant: "success" });
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
            Error loading league data
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (!league) {
    return (
      <Dialog open={open} disableRestoreFocus onClose={() => {}}>
        <DialogContent>
          <Box sx={{ p: 2 }}>No data available</Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <LeagueForm
      open={open}
      onClose={onClose}
      title="Edit League"
      initialValues={initialValues}
      enableReinitialize
      leagueIdForLogo={league.id}
      maxYear={startYear}
      onSave={handleSave}
    />
  );
};

export default UpdateLeague;
