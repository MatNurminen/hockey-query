import FormControl from "@mui/material/FormControl";
import { getCfSubfolders } from "../../../../api/cloudflare/queries";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { memo, useId } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SelectCfSubfolder = memo(({ value, onChange }: Props) => {
  const { data, isLoading, isError } = getCfSubfolders("teams");
  const labelId = useId();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!data) return <p>No data available</p>;

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth size="small" required>
      <InputLabel id={labelId}>Folder</InputLabel>
      <Select
        labelId={labelId}
        id={`${labelId}-select`}
        value={value}
        label="Folder"
        onChange={handleChange}
      >
        {data.map((folder: string) => (
          <MenuItem key={folder} value={folder}>
            {folder}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default SelectCfSubfolder;
