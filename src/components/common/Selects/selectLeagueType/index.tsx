import { memo } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getLeagueTypes } from "../../../../api/league-types/queries";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";

export interface Props {
  id?: string;
  name?: string;
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false;
  disabled?: boolean;
}

const SelectLeagueType = (props: Props) => {
  const {
    id = "league-type-select",
    name = "type_id",
    label = "League Type",
    value,
    onChange,
    onBlur,
    error,
    helperText,
    disabled,
  } = props;

  const { data, isLoading, isError } = getLeagueTypes();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!data) return <p>No data available</p>;

  const handleChange = (event: SelectChangeEvent<number>) => {
    onChange?.(Number(event.target.value));
  };

  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        id={id}
        name={name}
        labelId={`${id}-label`}
        value={value ?? ""}
        label={label}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
      >
        {data.map((type) => (
          <MenuItem key={type.id} value={type.id}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default memo(SelectLeagueType);
