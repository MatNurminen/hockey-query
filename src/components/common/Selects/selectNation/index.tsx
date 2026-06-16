import { useState, type FocusEventHandler, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TableFlag from "../../Images/tableFlag";
import FormHelperText from "@mui/material/FormHelperText";
import { getNations } from "../../../../api/nations/queries";
import { TNationDto } from "../../../../api/nations/types";

export interface Props {
  id?: string;
  name?: string;
  label?: string;
  defaultValue?: string;
  setFormInput?: (value: { nation_id: number }) => void;
  onChange?: (value: number) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  errorId?: boolean;
  helperText?: ReactNode;
  value?: number;
  disabled?: boolean;
}

const SelectNation = (props: Props) => {
  const [searchParams] = useSearchParams();
  const nationId = String(searchParams.get("nation"));
  const [nation, setNation] = useState(nationId);
  const [nationParam, setNationParam] = useSearchParams();
  const {
    id,
    name,
    setFormInput,
    label,
    onBlur,
    errorId,
    helperText,
    value,
    disabled,
  } = props;

  const defaultLabel = label || "Nation";

  const { data, isLoading, isError } = getNations();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!data) return <p>No data available</p>;

  const handleChange = (event: SelectChangeEvent) => {
    const stringValue = event.target.value;
    setNation(stringValue);
    const numericValue = Number(stringValue);

    if (setFormInput) {
      setFormInput({ nation_id: numericValue });
    } else {
      nationParam.set("nation", stringValue);
      setNationParam(nationParam);
    }

    if (props.onChange) {
      props.onChange(numericValue);
    }
  };

  return (
    <FormControl fullWidth size="small" error={errorId}>
      <InputLabel id="select-label">{defaultLabel}</InputLabel>
      <Select
        labelId="nation-label"
        id={id}
        name={name}
        value={value !== undefined ? String(value) : nation}
        label={defaultLabel}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
      >
        {data.map((nation: TNationDto) => (
          <MenuItem key={nation.id} value={String(nation.id)}>
            <Box display="flex" alignItems="center">
              <Box display="flex" sx={{ mr: 1 }}>
                <TableFlag alt="" src={nation.flag} />
              </Box>
              {nation.name}
            </Box>
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default SelectNation;
