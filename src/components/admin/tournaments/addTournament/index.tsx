import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SelectSeason from "../../../common/Selects/selectSeason";
import SelectLeague from "../../../common/Selects/selectLeague";
import { useAddTournament } from "../../../../api/tournaments/mutations";
import { useFormik } from "formik";
import tournamentSchema from "../../validations/tournamentSchema";
import { useSnackbar } from "notistack";
import DialogContent from "@mui/material/DialogContent";
import SectionHeader from "../../../common/Sections/sectionHeader";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import GreenButton from "../../../common/Buttons/greenButton";
import GrayButton from "../../../common/Buttons/grayButton";
import { useLatestSeason } from "../../../../hooks/useLatestSeason";

export interface AddTournamentDialogProps {
  open: boolean;
  onClose: () => void;
  leagueId: number;
}

const AddTournament = (props: AddTournamentDialogProps) => {
  const { onClose, open, leagueId } = props;
  const { mutateAsync: addTournament } = useAddTournament(Number(leagueId));
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const { startYear, isLoading: seasonsLoading } = useLatestSeason();

  const formik = useFormik<{
    season_id: number;
    league_id: number;
  }>({
    enableReinitialize: true,
    initialValues: {
      season_id: startYear,
      league_id: Number(leagueId),
    },
    validationSchema: tournamentSchema,
    onSubmit: async (values) => {
      setSaving(true);
      try {
        const result = await addTournament(values);
        if (result.id) {
          enqueueSnackbar(
            `Tournament added successfully with id: ${result.id}`,
            { variant: "success" },
          );
          formik.resetForm();
          onClose();
        }
      } catch (e) {
        enqueueSnackbar("Failed to save tournament.", { variant: "error" });
      } finally {
        setSaving(false);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    enqueueSnackbar("The changes haven't been saved.", { variant: "info" });
    onClose();
  };

  return (
    <Dialog open={open} fullWidth>
      <DialogContent>
        {seasonsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <SectionHeader txtAlign="left" content="Add Tournament" />
            <Box position="relative">
              {saving && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(255, 255, 255, 0.7)",
                    zIndex: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              )}
              <Box component="form" noValidate autoComplete="off">
                <Grid container spacing={2} rowSpacing={3}>
                  <Grid size={{ xs: 6 }}>
                    <SelectLeague
                      value={formik.values.league_id?.toString()}
                      onChange={(val) => {
                        formik.setFieldValue("league_id", Number(val));
                        const params = new URLSearchParams(searchParams);
                        params.set("league", val);
                        setSearchParams(params);
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box>
                      <SelectSeason
                        value={formik.values.season_id?.toString()}
                        onChange={(val) =>
                          formik.setFieldValue("season_id", Number(val))
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 5 }}>
        <Stack direction="row" spacing={2}>
          <GreenButton
            text="Save"
            size="small"
            onClick={() => formik.handleSubmit()}
            iconIndex={1}
            disabled={saving}
          />
          <GrayButton
            text="Cancel"
            size="small"
            onClick={handleClose}
            disabled={saving}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddTournament;
