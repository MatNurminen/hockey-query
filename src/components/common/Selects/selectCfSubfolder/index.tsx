import FormControl from "@mui/material/FormControl";
import { getCfSubfolders } from "../../../../api/cloudflare/queries";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { memo } from "react";
import { TCfSubfolderDto } from "../../../../api/cloudflare/types";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
}

const SelectCfSubfolder = memo(({ value, onChange }: SelectProps) => {
  const { data, isLoading, isError } = getCfSubfolders("teams");

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="select-label">Folder *</InputLabel>
      <Select
        labelId="select-folder"
        id="select-folder"
        value={value}
        label="Folder"
        onChange={handleChange}
      >
        {data.map((folder: TCfSubfolderDto) => (
          <MenuItem key={folder.subfolderName} value={folder.subfolderName}>
            {folder.subfolderName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default SelectCfSubfolder;
