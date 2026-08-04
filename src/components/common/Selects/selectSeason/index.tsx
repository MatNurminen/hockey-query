import { useId } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSeasons } from "../../../../api/seasons/queries";
import { navigateWithParams } from "../../../utils/urlHelpers";

export interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectSeason = ({ value, onChange }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const labelId = useId();
  const { data, isLoading, isError } = getSeasons();

  const seasonFromUrl = searchParams.get("season") || "";
  const currentValue = value ?? seasonFromUrl;

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;

    if (onChange) {
      onChange(newValue);
    } else {
      navigateWithParams(navigate, searchParams, {
        season: newValue,
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!data) return <p>No data available</p>;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={labelId}>Season</InputLabel>
      <Select
        labelId={labelId}
        id={`${labelId}-select`}
        value={currentValue || ""}
        onChange={handleChange}
        label="Season"
      >
        {data.map((season) => (
          <MenuItem key={season.id} value={String(season.id)}>
            {season.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectSeason;
