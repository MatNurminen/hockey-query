import { memo, useState } from "react";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import { getTeams } from "../../../../api/teams/queries";
import { useDebounce } from "use-debounce";
import { TTeamDto } from "../../../../api/teams/types";
import TableFlag from "../../../common/Images/tableFlag";

interface Props {
  handleToggle: (value: number) => () => void;
  checked: readonly number[];
}

const ListAllTeams = ({ handleToggle, checked }: Props) => {
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [debouncedValue] = useDebounce(inputValue, 400);

  const { data: teams, isLoading, isError } = getTeams(debouncedValue);

  return (
    <>
      <TextField
        label="Filter team"
        value={inputValue}
        size="small"
        fullWidth
        sx={{ backgroundColor: "#fff", mb: 1 }}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        slots={{ input: OutlinedInput }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "action.active" }} />
              </InputAdornment>
            ),
            endAdornment: inputValue && (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setInputValue("")}
                  size="small"
                  sx={{ backgroundColor: "transparent" }}
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
          inputLabel: {
            shrink: !!(inputValue || focused),
            sx: {
              ...(!(inputValue || focused) ? { ml: 3 } : {}),
            },
          },
        }}
      />
      <Paper
        elevation={4}
        sx={{ width: "100%", height: 470, overflow: "auto" }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <p>Loading...</p>
          </Box>
        ) : isError ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <p>Error!</p>
          </Box>
        ) : !teams || teams.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <p>No data available</p>
          </Box>
        ) : (
          <List>
            {teams.map((team: TTeamDto) => (
              <ListItem
                key={team.id}
                role="listitem"
                onClick={handleToggle(team.id)}
              >
                <Checkbox
                  checked={checked.indexOf(team.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": team.id?.toString(),
                  }}
                />
                <Box display="flex" sx={{ mr: 1 }}>
                  <TableFlag
                    src={team.nation.flag}
                    alt={`${team.full_name} flag`}
                  />
                </Box>
                <ListItemText
                  id={team.id?.toString()}
                  primary={team.full_name}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </>
  );
};

export default memo(ListAllTeams);
