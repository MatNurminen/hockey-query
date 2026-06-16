import { memo } from "react";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSeasons } from "../../../../api/seasons/queries";
import { navigateWithParams } from "../../../utils/urlHelpers";
import { TSeasonDto } from "../../../../api/seasons/types";

export interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectSeason = ({ value, onChange }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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
  if (isError || !data) return <p>Error loading seasons</p>;

  return (
    <Stack direction="row" spacing={2}>
      <FormControl fullWidth size="small">
        <Select
          labelId="season-label"
          id="season-select"
          value={currentValue || ""}
          onChange={handleChange}
        >
          {data.map((season: TSeasonDto) => (
            <MenuItem key={season.id} value={String(season.id)}>
              {season.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default memo(SelectSeason);
