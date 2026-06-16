import { useEffect, useState, type ReactNode } from "react";
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
  onBlur?: () => void;
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
  const toInternal = (v: number | null | undefined) =>
    nullable && (v === null || v === undefined) ? "NONE" : String(v ?? "");

  const [internalValue, setInternalValue] = useState<string>(toInternal(value));

  useEffect(() => {
    setInternalValue(toInternal(value));
  }, [value, nullable]);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    if (nullable && newValue === "NONE") {
      onChange(null);
    } else {
      onChange(Number(newValue));
    }
  };

  const items = [];
  for (let i: number = min; i <= max; i++) {
    const strValue = String(i);
    items.push(
      <MenuItem key={strValue} value={strValue}>
        {i}
      </MenuItem>,
    );
  }

  return (
    <FormControl fullWidth size="small" error={error} disabled={disabled}>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="label"
        id={id}
        name={name}
        value={internalValue}
        label={label}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
      >
        {nullable && (
          <MenuItem key={0} value="NONE">
            NONE
          </MenuItem>
        )}
        {items}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectNumber;
