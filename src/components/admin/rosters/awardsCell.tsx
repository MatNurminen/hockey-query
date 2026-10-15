import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TAwardDto } from "../../../api/awards/types";
import { PlayerAwardDto } from "../../../api/players-stats/types";
import {
  useAddPlayerAward,
  useDeletePlayerAward,
} from "../../../api/players-tournaments-awards/mutations";

interface Props {
  playerTournamentId: number;
  leagueId: number;
  seasonId: number;
  options: TAwardDto[];
  initialValue?: PlayerAwardDto[];
}

export function AwardsCell({
  playerTournamentId,
  leagueId,
  seasonId,
  options,
  initialValue = [],
}: Props) {
  const { mutate: addPlayerAward } = useAddPlayerAward(leagueId, seasonId);
  const { mutate: deletePlayerAward } = useDeletePlayerAward(
    leagueId,
    seasonId,
  );

  return (
    <Autocomplete<TAwardDto, true, true, false>
      fullWidth
      sx={{ my: 1 }}
      size="small"
      multiple
      disableClearable
      id={`awards-${playerTournamentId}`}
      options={options}
      getOptionLabel={(option) => option.name}
      value={initialValue as unknown as TAwardDto[]}
      isOptionEqualToValue={(option, val) =>
        option.id === (val as unknown as PlayerAwardDto).award_id
      }
      onChange={(_, newValue, reason) => {
        if (reason === "selectOption") {
          const added = newValue[newValue.length - 1] as TAwardDto;
          if (!added) return;

          addPlayerAward({
            players_tournament_id: playerTournamentId,
            award_id: added.id,
          });
          return;
        }

        if (reason === "removeOption") {
          const removed = initialValue.find(
            (v) =>
              !(newValue as unknown as PlayerAwardDto[]).some(
                (n) => n.award_id === v.award_id,
              ),
          );
          if (!removed) return;

          if (removed.id < 0) return;

          deletePlayerAward({
            id: removed.id,
            playerTournamentId,
          });
        }
      }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Awards" />
      )}
    />
  );
}
