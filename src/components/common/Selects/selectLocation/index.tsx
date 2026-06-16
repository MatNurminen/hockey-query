import { useState, FC, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams, useLocation } from "react-router-dom";

interface SelectOption {
  id: number | null;
  name: string;
}

interface SelectLocation {
  param_key: string;
  callback: (search: string) => unknown;
  options: SelectOption[];
}

const SelectLocation: FC<SelectLocation> = ({
  param_key,
  callback,
  options,
}) => {
  const [value, setValue] = useState("");
  const [param, setParam] = useSearchParams();
  const { search } = useLocation();

  const cur_param = param.get(param_key) ?? "";

  const handleChange = (event: SelectChangeEvent) => {
    param.set(param_key, event.target.value);
    setParam(param);
    setValue(event.target.value);
  };

  useEffect(() => {
    callback(search);
    setValue(cur_param);
  }, [callback, search]);

  return (
    <FormControl fullWidth size="small">
      <InputLabel>{param_key}</InputLabel>
      <Select
        labelId={`${param_key}-label`}
        id={`${param_key}-select`}
        value={value}
        label={param_key}
        onChange={handleChange}
      >
        {options.map((option, key) => (
          <MenuItem key={key} value={option.id || ""}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLocation;
