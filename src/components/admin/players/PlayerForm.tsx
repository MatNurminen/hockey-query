import { useCallback, useState } from "react";
import { useSnackbar } from "notistack";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SectionHeader from "../../common/Sections/sectionHeader";
import DialogActions from "@mui/material/DialogActions";
import GreenButton from "../../common/Buttons/greenButton";
import { useFormik } from "formik";
import GrayButton from "../../common/Buttons/grayButton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import SelectNumber from "../../common/Selects/selectNumber";
import SelectNation from "../../common/Selects/selectNation";
import SelectTeam from "../../common/Selects/selectTeam";
import playerSchema from "../validations/playerSchema";
import type { FormValues } from "./types";

interface PlayerFormProps {
  open: boolean;
  onClose: () => void;
  title: string;
  initialValues: FormValues;
  enableReinitialize?: boolean;
  maxYear: number;
  seasonsLoading?: boolean;
  onSave: (values: FormValues) => Promise<void>;
}

const PlayerForm = ({
  open,
  onClose,
  title,
  initialValues,
  enableReinitialize = false,
  maxYear,
  seasonsLoading = false,
  onSave,
}: PlayerFormProps) => {
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize,
    validationSchema: playerSchema,
    onSubmit: async (values, helpers) => {
      setSaving(true);
      try {
        await onSave(values);
        helpers.resetForm();
        onClose();
      } finally {
        setSaving(false);
      }
    },
  });

  const handleNationChange = useCallback(
    (value: number) => {
      formik.setFieldValue("nation_id", value);
    },
    [formik.setFieldValue],
  );

  const handleClose = () => {
    enqueueSnackbar("The changes haven't been saved.", { variant: "info" });
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} disableRestoreFocus onClose={() => {}}>
      <DialogContent>
        {seasonsLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <SectionHeader txtAlign="left" content={title} />
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
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
                <Grid container spacing={2} rowSpacing={3}>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      required
                      name="first_name"
                      label="First Name"
                      variant="outlined"
                      size="small"
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.first_name &&
                        Boolean(formik.errors.first_name)
                      }
                      helperText={
                        formik.touched.first_name && formik.errors.first_name
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      required
                      name="last_name"
                      label="Last Name"
                      variant="outlined"
                      size="small"
                      value={formik.values.last_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.last_name &&
                        Boolean(formik.errors.last_name)
                      }
                      helperText={
                        formik.touched.last_name && formik.errors.last_name
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 3 }}>
                    <SelectNumber
                      value={formik.values.jersey_number}
                      label="Jersey Number *"
                      id="jersey_number"
                      name="jersey_number"
                      min={1}
                      max={99}
                      onChange={(value: number | null) => {
                        if (value !== null) formik.setFieldValue("jersey_number", value);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.jersey_number &&
                        Boolean(formik.errors.jersey_number)
                      }
                      helperText={
                        formik.touched.jersey_number &&
                        formik.errors.jersey_number
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 3 }}>
                    <TextField
                      fullWidth
                      required
                      name="player_position"
                      label="Position"
                      variant="outlined"
                      size="small"
                      value={formik.values.player_position}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.player_position &&
                        Boolean(formik.errors.player_position)
                      }
                      helperText={
                        formik.touched.player_position &&
                        formik.errors.player_position
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 2 }}>
                    <SelectNumber
                      value={formik.values.player_order}
                      label="Order"
                      id="player_order"
                      name="player_order"
                      min={1}
                      max={3}
                      onChange={(value: number | null) => {
                        if (value !== null) formik.setFieldValue("player_order", value);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.player_order &&
                        Boolean(formik.errors.player_order)
                      }
                      helperText={
                        formik.touched.player_order &&
                        formik.errors.player_order
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <SelectNation
                      id="nation_id"
                      name="nation_id"
                      value={formik.values.nation_id}
                      label="Nation *"
                      onChange={handleNationChange}
                      onBlur={formik.handleBlur}
                      errorId={
                        formik.touched.nation_id &&
                        Boolean(formik.errors.nation_id)
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <SelectNumber
                      value={formik.values.birth_year}
                      label="Birth Year *"
                      id="birth_year"
                      name="birth_year"
                      min={1950}
                      max={2020}
                      onChange={(value: number | null) => {
                        if (value !== null) formik.setFieldValue("birth_year", value);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.birth_year &&
                        Boolean(formik.errors.birth_year)
                      }
                      helperText={
                        formik.touched.birth_year && formik.errors.birth_year
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <SelectNumber
                      value={formik.values.height}
                      label="Height"
                      id="height"
                      name="height"
                      min={150}
                      max={220}
                      onChange={(value: number | null) => {
                        if (value !== null) formik.setFieldValue("height", value);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.height && Boolean(formik.errors.height)
                      }
                      helperText={formik.touched.height && formik.errors.height}
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <SelectNumber
                      value={formik.values.weight}
                      label="Weight"
                      id="weight"
                      name="weight"
                      min={50}
                      max={120}
                      onChange={(value: number | null) => {
                        if (value !== null) formik.setFieldValue("weight", value);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.weight && Boolean(formik.errors.weight)
                      }
                      helperText={formik.touched.weight && formik.errors.weight}
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <SelectTeam
                      leagueId={14}
                      id="draft_team"
                      name="draft_team"
                      label="Draft Team"
                      value={formik.values.draft_team_id}
                      onChange={(value: number | null) => {
                        formik.setFieldValue("draft_team_id", value);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.draft_team_id &&
                        Boolean(formik.errors.draft_team_id)
                      }
                      helperText={
                        formik.touched.draft_team_id &&
                        formik.errors.draft_team_id
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 3 }}>
                    <SelectNumber
                      value={formik.values.start_year}
                      label="Start Year *"
                      id="start_year"
                      name="start_year"
                      min={1980}
                      max={maxYear}
                      onChange={(value: number | null) => {
                        if (value !== null) formik.setFieldValue("start_year", value);
                        setTimeout(() => formik.validateForm(), 0);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.start_year &&
                        Boolean(formik.errors.start_year)
                      }
                      helperText={
                        formik.touched.start_year && formik.errors.start_year
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 3 }}>
                    <SelectNumber
                      value={formik.values.end_year}
                      label="End Year"
                      id="end_year"
                      name="end_year"
                      min={1980}
                      max={maxYear}
                      nullable
                      onChange={(value: number | null) => {
                        formik.setFieldValue("end_year", value);
                        formik.setFieldTouched("end_year", true);
                        setTimeout(() => formik.validateForm(), 0);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.end_year &&
                        Boolean(formik.errors.end_year)
                      }
                      helperText={
                        formik.touched.end_year && formik.errors.end_year
                      }
                      disabled={saving}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 2 }}>
        <Stack direction="row" spacing={2}>
          <GreenButton
            text="Save"
            size="small"
            onClick={formik.submitForm}
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

export default PlayerForm;
