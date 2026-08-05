import { useId, useState } from "react";
import { useDebounce } from "use-debounce";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ClearIcon from "@mui/icons-material/Clear";
import TableFlag from "../../common/Images/tableFlag";
import { getPlayers } from "../../../api/players/queries";

type Props = {
  onPlayerSelect: (playerId: number) => void;
};

const SearchPlayer = ({ onPlayerSelect }: Props) => {
  const searchId = useId();
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [debouncedInput] = useDebounce(inputValue, 400);
  const enabled = debouncedInput.length > 2;

  const {
    data: players = [],
    isFetching,
    isError,
  } = getPlayers(debouncedInput, enabled);
  const showPopup = enabled && !isFetching && !isError;

  return (
    <Autocomplete
      id={searchId}
      options={players}
      loading={isFetching}
      inputValue={inputValue}
      onInputChange={(_, value) => setInputValue(value)}
      value={null}
      clearOnBlur={false}
      forcePopupIcon={false}
      noOptionsText={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchOffIcon fontSize="small" sx={{ color: "action.active" }} />
          <span>No results found for &quot;{debouncedInput}&quot;.</span>
        </Box>
      }
      getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
      onChange={(_, newValue) => {
        if (newValue) {
          onPlayerSelect(newValue.id);
          setInputValue("");
        }
      }}
      getOptionKey={(option) => option.id}
      renderOption={(props, option) => {
        const { key, ...rest } = props;
        return (
          <Box
            component="li"
            key={key}
            {...rest}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box display="flex" sx={{ mr: 1 }}>
              <TableFlag
                src={option.nation.flag}
                alt={`${option.first_name} ${option.last_name} flag`}
              />
            </Box>
            {option.first_name} {option.last_name} ({option.birth_year}) (
            {option.player_position})
          </Box>
        );
      }}
      sx={{ width: "100%", backgroundColor: "background.paper" }}
      open={open && showPopup && focused}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderInput={(params) => {
        const { InputProps, ...otherParams } = params;
        return (
          <TextField
            {...otherParams}
            aria-label="Search players"
            placeholder="Search players"
            size="small"
            slotProps={{
              input: {
                ...InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "action.active" }} />
                  </InputAdornment>
                ),
                endAdornment: inputValue ? (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => setInputValue("")}
                      aria-label="Clear search"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        );
      }}
    />
  );
};

export default SearchPlayer;
