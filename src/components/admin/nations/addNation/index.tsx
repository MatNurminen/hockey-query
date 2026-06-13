import { useSnackbar } from "notistack";
import { useAddNation } from "../../../../api/nations/mutations";
import NationForm from "../NationForm";
import type { FormValues } from "../types";

const noImage = import.meta.env.VITE_CG_NO_IMAGE;

export interface AddNationDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddNation = ({ open, onClose }: AddNationDialogProps) => {
  const { mutateAsync: addNation } = useAddNation();
  const { enqueueSnackbar } = useSnackbar();

  const initialValues: FormValues = {
    name: "",
    short_name: "",
    flag: noImage,
    logo: noImage,
    color: "#ffffff",
  };

  const handleSave = async (values: FormValues) => {
    const result = await addNation(values);
    enqueueSnackbar(`Nation added successfully with name: ${result.name}`, {
      variant: "success",
    });
  };

  return (
    <NationForm
      open={open}
      onClose={onClose}
      title="Add Nation"
      initialValues={initialValues}
      onSave={handleSave}
    />
  );
};

export default AddNation;
