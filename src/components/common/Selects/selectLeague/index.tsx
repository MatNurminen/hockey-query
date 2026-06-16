import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";
import { getLeaguesCurLogo } from "../../../../api/leagues/queries";
import { TLeagueDto } from "../../../../api/leagues/types";

export interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectLeague = ({ value, onChange }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: leagues, isLoading, isError } = getLeaguesCurLogo();

  const leagueFromUrl = searchParams.get("league") || "";
  const currentValue = value ?? leagueFromUrl;

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    } else {
      searchParams.set("league", newValue);
      setSearchParams(searchParams);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!leagues) return <p>No data available</p>;

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="select-label">League</InputLabel>
      <Select
        labelId="league-label"
        id="league-select"
        value={currentValue || ""}
        onChange={handleChange}
        label="League"
      >
        {leagues.map((league: TLeagueDto) => (
          <MenuItem key={league.id} value={String(league.id)}>
            {league.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectLeague;
