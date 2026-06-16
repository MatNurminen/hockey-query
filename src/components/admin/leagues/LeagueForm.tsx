import { useState } from "react";
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
import SelectNumber from "../../common/Selects/selectNumber";
import Grid from "@mui/material/Grid2";
import BorderedBox from "../../common/Boxes/borderedBox";
import {
  useDeleteAllFromTmp,
  useMoveCfFile,
} from "../../../api/cloudflare/mutations";
import AppButton from "../../common/Buttons/appButton";
import Logos from "../../common/Images/logos";
import { TCreateLeagueLogoDto } from "../../../api/league-logos/types";
import { getKeyFromLogo } from "../../utils/urlHelpers";
import leagueSchema from "../validations/leagueSchema";
import CircularProgress from "@mui/material/CircularProgress";
import SelectLeagueType from "../../common/Selects/selectLeagueType";
import type {
  FormikErrorsWithLogos,
  FormikTouchedWithLogos,
  FormValues,
} from "./types";

const noImage = import.meta.env.VITE_CG_NO_IMAGE;
const bucketPath = import.meta.env.VITE_CF_BUCKET_PATH;

interface LeagueFormProps {
  open: boolean;
  onClose: () => void;
  title: string;
  initialValues: FormValues;
  enableReinitialize?: boolean;
  leagueIdForLogo?: number;
  maxYear: number;
  seasonsLoading?: boolean;
  onSave: (
    values: FormValues,
    preparedLogos: TCreateLeagueLogoDto[],
  ) => Promise<void>;
}

const LeagueForm = ({
  open,
  onClose,
  title,
  initialValues,
  enableReinitialize = false,
  leagueIdForLogo,
  maxYear,
  seasonsLoading = false,
  onSave,
}: LeagueFormProps) => {
  const [saving, setSaving] = useState(false);
  const { mutateAsync: moveCfFile } = useMoveCfFile();
  const { mutate: deleteAllFromTmp } = useDeleteAllFromTmp();
  const { enqueueSnackbar } = useSnackbar();

  const prepareLogosForSave = async (
    logos: FormValues["logos"],
  ): Promise<TCreateLeagueLogoDto[]> => {
    const tasks = logos
      .filter((l) => l.logo && l.start_year !== null)
      .map(async (l) => {
        const rawKey = l.logo === noImage ? l.logo : getKeyFromLogo(l.logo);
        if (l.logo !== noImage && rawKey.includes("/tmp/")) {
          const toKey = rawKey.replace("/tmp/", "/leagues/");
          await moveCfFile({ fromKey: rawKey, toKey });
          return {
            ...(typeof l.id === "number" ? { id: l.id } : {}),
            logo: `${bucketPath}${toKey}`,
            start_year: l.start_year as number,
            ...(l.end_year != null ? { end_year: l.end_year } : {}),
          };
        }
        return {
          ...(typeof l.id === "number" ? { id: l.id } : {}),
          logo: l.logo === noImage ? rawKey : `${bucketPath}${rawKey}`,
          start_year: l.start_year as number,
          ...(l.end_year != null ? { end_year: l.end_year } : {}),
        };
      });
    return Promise.all(tasks);
  };

  const formik = useFormik<FormValues>({
    initialValues,
    enableReinitialize,
    validationSchema: leagueSchema,
    onSubmit: async (values, helpers) => {
      setSaving(true);
      try {
        const preparedLogos = await prepareLogosForSave(values.logos);
        await onSave(values, preparedLogos);
        deleteAllFromTmp();
        onClose();
        helpers.resetForm();
      } finally {
        setSaving(false);
      }
    },
  });

  const handleAddLogo = () => {
    const next = [
      ...formik.values.logos,
      {
        ...(leagueIdForLogo
          ? { id: undefined, league_id: leagueIdForLogo }
          : {}),
        start_year: formik.values.start_year ?? maxYear,
        end_year: null,
        logo: noImage,
      },
    ];
    formik.setFieldValue("logos", next);
  };

  const handleRemoveLogo = (index: number) => {
    const next = formik.values.logos.filter((_, i) => i !== index);
    formik.setFieldValue("logos", next);
  };

  const handleUpdateLogo = (
    index: number,
    updatedData: Partial<
      Pick<FormValues["logos"][number], "logo" | "start_year" | "end_year">
    >,
  ) => {
    const next = formik.values.logos.map((logo, i) =>
      i === index ? { ...logo, ...updatedData } : logo,
    );
    formik.setFieldValue("logos", next);
    Object.keys(updatedData).forEach((field) => {
      formik.setFieldTouched(`logos.${index}.${field}`, true);
    });
    setTimeout(() => formik.validateForm(), 0);
  };

  const handleLogoFieldBlur = (field: string) => {
    formik.setFieldTouched(field, true);
  };

  const handleCancel = () => {
    deleteAllFromTmp();
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
                <Grid container spacing={2}>
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
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <TextField
                      fullWidth
                      required
                      name="short_name"
                      label="Short Name"
                      variant="outlined"
                      size="small"
                      value={formik.values.short_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.short_name &&
                        Boolean(formik.errors.short_name)
                      }
                      helperText={
                        formik.touched.short_name && formik.errors.short_name
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <BorderedBox title="League Logos">
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        sx={{ mt: 1 }}
                      >
                        {formik.values.logos?.map((logo, index) => (
                          <Grid key={index} size={{ xs: 6 }}>
                            <BorderedBox title={`Logo ${index + 1}`}>
                              <Logos
                                logo={logo.logo}
                                start_year={logo.start_year}
                                end_year={logo.end_year}
                                index={index}
                                onUpdate={handleUpdateLogo}
                                onFieldBlur={handleLogoFieldBlur}
                                startYearError={
                                  (formik.errors as FormikErrorsWithLogos)
                                    .logos?.[index]?.start_year
                                }
                                startYearTouched={
                                  (formik.touched as FormikTouchedWithLogos)
                                    .logos?.[index]?.start_year
                                }
                                endYearError={
                                  (formik.errors as FormikErrorsWithLogos)
                                    .logos?.[index]?.end_year
                                }
                                endYearTouched={
                                  (formik.touched as FormikTouchedWithLogos)
                                    .logos?.[index]?.end_year
                                }
                              />
                              <Box sx={{ mt: 1 }}>
                                <AppButton
                                  text="Remove Logo"
                                  color="error"
                                  size="small"
                                  onClick={() => handleRemoveLogo(index)}
                                  hidden={index === 0}
                                  disabled={saving}
                                />
                              </Box>
                            </BorderedBox>
                          </Grid>
                        ))}
                      </Grid>
                      <Box sx={{ mt: 1 }}>
                        <GreenButton
                          text="Add logo"
                          size="small"
                          onClick={handleAddLogo}
                          iconIndex={3}
                          disabled={saving}
                        />
                      </Box>
                    </BorderedBox>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <SelectLeagueType
                      id="type_id"
                      name="type_id"
                      label="League Type"
                      value={formik.values.type_id}
                      onChange={(value: number) => {
                        formik.setFieldValue("type_id", value);
                      }}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.type_id && Boolean(formik.errors.type_id)
                      }
                      helperText={
                        formik.touched.type_id && formik.errors.type_id
                      }
                      disabled={saving}
                    />
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <SelectNumber
                      value={formik.values.start_year}
                      label="Start Year *"
                      id="start_year"
                      name="start_year"
                      min={1980}
                      max={maxYear}
                      onChange={(value: number | null) => {
                        if (value !== null)
                          formik.setFieldValue("start_year", value);
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
                  <Grid size={{ xs: 6 }}>
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
      <DialogActions sx={{ mb: 2, mr: 5 }}>
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
            onClick={handleCancel}
            disabled={saving}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default LeagueForm;
