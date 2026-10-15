import { useEffect, useState } from "react";
import {
  nameDuplicate,
  hasDuplicateAwardName,
  useAddAward,
} from "../../../api/awards/mutations";
import { getLeague } from "../../../api/leagues/queries";
import { useSnackbar } from "notistack";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import awardSchema from "../validations/awardSchema";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Stack from "@mui/material/Stack";
import AppButton from "../../common/Buttons/appButton";
import SectionHeader from "../../common/Sections/sectionHeader";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import SelectLeague from "../../common/Selects/selectLeague";
import TextField from "@mui/material/TextField";

export interface Props {
  open: boolean;
  onClose: () => void;
  leagueId: number;
}

const AddAward = (props: Props) => {
  const { onClose, open, leagueId } = props;
  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();

  const formik = useFormik<{
    league_id: number;
    name: string;
  }>({
    initialValues: {
      league_id: Number(leagueId),
      name: "",
    },
    validationSchema: awardSchema,
    onSubmit: async (values) => {
      if (hasDuplicateAwardName(league, values.name)) {
        formik.setFieldError("name", nameDuplicate);
        return;
      }

      setSaving(true);
      try {
        const result = await addAward(values);
        enqueueSnackbar(`Award added successfully with id: ${result.id}`, {
          variant: "success",
        });
        formik.resetForm();
        onClose();
      } catch {
        // Errors are surfaced by the mutation's onError (e.g. duplicate name)
      } finally {
        setSaving(false);
      }
    },
  });

  const { mutateAsync: addAward } = useAddAward(formik.values.league_id);

  useEffect(() => {
    if (!open) return;
    formik.setValues({ league_id: Number(leagueId), name: "" }, false);
    formik.setTouched({}, false);
    // Reset only when the dialog opens, so switching league keeps the typed name
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { data: league } = getLeague(formik.values.league_id);
  const nameError = hasDuplicateAwardName(league, formik.values.name)
    ? nameDuplicate
    : formik.touched.name
      ? formik.errors.name
      : undefined;

  const handleClose = () => {
    formik.resetForm();
    enqueueSnackbar("The changes haven't been saved.", { variant: "info" });
    onClose();
  };
  return (
    <Dialog open={open} fullWidth disableRestoreFocus onClose={() => {}}>
      <DialogContent>
        <SectionHeader txtAlign="left" content="Add Award" />
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
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Name"
                  variant="outlined"
                  size="small"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(nameError)}
                  helperText={nameError}
                  disabled={saving}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 2, mr: 5 }}>
        <Stack direction="row" spacing={2}>
          <AppButton
            text="Save"
            size="small"
            onClick={formik.submitForm}
            iconName="save"
            disabled={saving || Boolean(nameError)}
            color="success"
          />
          <AppButton
            text="Cancel"
            size="small"
            onClick={handleClose}
            disabled={saving}
            iconName="cancel"
            color="inherit"
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default AddAward;
