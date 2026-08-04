import { useId } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import TableFlag from "../../Images/tableFlag";
import FormHelperText from "@mui/material/FormHelperText";
import { getTeamsByLeague } from "../../../../api/teams/queries";

export interface Props {
  leagueId: number;
  id?: string;
  name?: string;
  label?: string;
  onChange?: (value: number | null) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false;
  value?: number | null;
  disabled?: boolean;
}

const SelectTeam = (props: Props) => {
  const {
    leagueId,
    id,
    name = "team",
    label = "Team",
    onChange,
    onBlur,
    error,
    helperText,
    value,
    disabled,
  } = props;

  const fallbackId = useId();
  const selectId = id ?? fallbackId;
  const labelId = `${selectId}-label`;

  const { data: teams, isLoading, isError } = getTeamsByLeague(leagueId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;
  if (!teams) return <p>No data available</p>;

  const handleChange = (event: SelectChangeEvent<number | null>) => {
    const val = event.target.value === "" ? null : Number(event.target.value);
    onChange?.(val);
  };

  return (
    <FormControl fullWidth size="small" error={error}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={selectId}
        name={name}
        value={value ?? ""}
        label={label}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
      >
        <MenuItem key={0} value="">
          NONE
        </MenuItem>
        {teams.map((team) => (
          <MenuItem key={team.id} value={team.id}>
            <Box display="flex" alignItems="center">
              <Box display="flex" sx={{ mr: 1 }}>
                <TableFlag src={team.logo} alt="" />
              </Box>
              {team.full_name}
            </Box>
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectTeam;
