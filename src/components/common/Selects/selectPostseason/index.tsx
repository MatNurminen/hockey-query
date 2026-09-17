import { memo, useId, type ReactNode } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import { getPostseason } from "../../../../api/postseason/queries";
import { TPostseasonDto } from "../../../../api/postseason/types";

export interface Props {
  value?: number | null;
  label?: string;
  id?: string;
  name?: string;
  autoOpen?: boolean;
  error?: boolean;
  helperText?: ReactNode;
  onChange: (value: number | null, option?: TPostseasonDto) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const SelectPostseason = ({
  value,
  label,
  id,
  name,
  autoOpen,
  error,
  helperText,
  onChange,
  onBlur,
  disabled,
}: Props) => {
  const labelId = useId();

  const { data } = getPostseason();

  if (!data) return null;

  const displayValue = String(value ?? "");

  const handleChange = (event: SelectChangeEvent) => {
    const newPostseasonId = Number(event.target.value);
    onChange(newPostseasonId, data.find((ps) => ps.id === newPostseasonId));
  };

  return (
    <FormControl fullWidth size="small" error={error}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        labelId={label ? labelId : undefined}
        id={id}
        name={name}
        value={displayValue}
        defaultOpen={autoOpen}
        label={label}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        sx={{ backgroundColor: "white" }}
      >
        {data.map((ps) => (
          <MenuItem key={ps.id} value={String(ps.id)}>
            <Box display="flex" alignItems="center">
              {ps.name}
            </Box>
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default memo(SelectPostseason);
