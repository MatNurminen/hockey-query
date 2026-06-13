import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useUpdateNation } from "../../../../api/nations/mutations";
import { getNation } from "../../../../api/nations/queries";
import NationForm from "../NationForm";
import type { FormValues } from "../types";

export interface UpdateNationDialogProps {
  open: boolean;
  onClose: () => void;
  nationId: number;
}

const UpdateNation = ({ open, onClose, nationId }: UpdateNationDialogProps) => {
  const { mutateAsync: updateNation } = useUpdateNation();
  const { data: nation, isError, isLoading } = getNation(nationId);

  const initialValues: FormValues = {
    name: nation?.name ?? "",
    short_name: nation?.short_name ?? "",
    flag: nation?.flag ?? "",
    logo: nation?.logo ?? "",
    color: nation?.color ?? null,
  };

  const handleSave = async (values: FormValues) => {
    await updateNation({
      id: nationId,
      name: values.name,
      short_name: values.short_name,
      flag: values.flag,
      logo: values.logo,
      color: values.color,
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
            Error loading nation data
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (!nation) {
    return (
      <Dialog open={open} disableRestoreFocus onClose={() => {}}>
        <DialogContent>
          <Box sx={{ p: 2 }}>No data available</Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <NationForm
      open={open}
      onClose={onClose}
      title="Edit Nation"
      initialValues={initialValues}
      enableReinitialize
      onSave={handleSave}
    />
  );
};

export default UpdateNation;
