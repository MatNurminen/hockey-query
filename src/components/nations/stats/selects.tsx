import { memo } from "react";
import SelectSeason from "../../common/Selects/selectSeason";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { navigateWithParams } from "../../utils/urlHelpers";
import Stack from "@mui/material/Stack";
import { tournaments } from "./tournaments";

const Selects = () => {
  const [searchParams] = useSearchParams();
  const currentTournament = Number(searchParams.get("tournament"));
  const navigate = useNavigate();

  const handlePositionChange = (event: SelectChangeEvent<number>) => {
    navigateWithParams(navigate, searchParams, {
      tournament: event.target.value,
    });
  };

  return (
    <Stack direction="row" spacing={2}>
      <SelectSeason />
      <FormControl fullWidth size="small">
        <Select
          labelId="positions-label"
          id="positions-select"
          value={currentTournament || 0}
          onChange={handlePositionChange}
          sx={{ backgroundColor: "white" }}
        >
          {tournaments.map((tournament) => (
            <MenuItem key={tournament.id} value={tournament.id}>
              {tournament.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default memo(Selects);
