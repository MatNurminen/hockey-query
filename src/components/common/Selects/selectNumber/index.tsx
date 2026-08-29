import { useId, type ReactNode } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";

interface Props {
  value?: number | null;
  label: string;
  id?: string;
  name?: string;
  min: number;
  max: number;
  nullable?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  onChange: (value: number | null) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const SelectNumber = ({
  value,
  label,
  id,
  name,
  min,
  max,
  nullable,
  error,
  helperText,
  onChange,
  onBlur,
  disabled,
}: Props) => {
  const labelId = useId();

  const displayValue =
    nullable && (value === null || value === undefined)
      ? "NONE"
      : String(value ?? "");

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    if (nullable && newValue === "NONE") {
      onChange(null);
    } else {
      onChange(Number(newValue));
    }
  };

  const items = [];
  for (let i = min; i <= max; i++) {
    const strValue = String(i);
    items.push(
      <MenuItem key={strValue} value={strValue}>
        {i}
      </MenuItem>,
    );
  }

  return (
    <FormControl fullWidth size="small" error={error} disabled={disabled}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        name={name}
        value={displayValue}
        label={label}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        sx={{backgroundColor: 'white'}}
      >
        {nullable && (
          <MenuItem key={0} value="NONE">
            NONE
          </MenuItem>
        )}
        {items}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectNumber;
