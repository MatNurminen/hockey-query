import { useId, type FocusEventHandler, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TableFlag from "../../Images/tableFlag";
import FormHelperText from "@mui/material/FormHelperText";
import { getNations } from "../../../../api/nations/queries";
import { navigateWithParams } from "../../../utils/urlHelpers";

export interface Props {
  id?: string;
  name?: string;
  label?: string;
  onChange?: (value: number) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: ReactNode;
  value?: number;
  disabled?: boolean;
}

const SelectNation = (props: Props) => {
  const {
    id,
    name,
    label,
    onChange,
    onBlur,
    error,
    helperText,
    value,
    disabled,
  } = props;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const labelId = useId();

  const defaultLabel = label || "Nation";

  const { data, isLoading, isError } = getNations();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!data) return <p>No data available</p>;

  const urlValue = searchParams.get("nation") ?? "";
  const displayValue =
    value !== undefined && value !== null ? String(value) : urlValue;

  const handleChange = (event: SelectChangeEvent) => {
    const stringValue = event.target.value;
    const numericValue = Number(stringValue);

    if (onChange) {
      onChange(numericValue);
    } else {
      navigateWithParams(navigate, searchParams, { nation: stringValue });
    }
  };

  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel id={labelId}>{defaultLabel}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        name={name}
        value={displayValue}
        label={defaultLabel}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        sx={{backgroundColor: 'white'}}
      >
        {data.map((nat) => (
          <MenuItem key={nat.id} value={String(nat.id)}>
            <Box display="flex" alignItems="center">
              <Box display="flex" sx={{ mr: 1 }}>
                <TableFlag alt="" src={nat.flag} />
              </Box>
              {nat.name}
            </Box>
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectNation;
