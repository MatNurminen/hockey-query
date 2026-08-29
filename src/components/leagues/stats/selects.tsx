import { useNavigate, useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import AppButton from "../../common/Buttons/appButton";
import { navigateWithParams, deleteParams } from "../../utils/urlHelpers";
import {
  TPlayerStatByClub,
  TPlayerStatDetail,
  TPlayerStatTotal,
} from "../../../api/players-stats/types";

type TPlayerSelectData = (
  | TPlayerStatDetail
  | TPlayerStatTotal
  | TPlayerStatByClub
) & { team_id?: number; full_name?: string };

interface Props {
  players: TPlayerSelectData[];
}

interface Position {
  id: number;
  name: string;
}

interface Team {
  id: number;
  name: string;
}

interface Nation {
  nation_id: number;
  player_nation: string;
  player_flag: string;
}

const positions: Position[] = [
  { id: 0, name: "All Positions" },
  { id: 3, name: "Forward" },
  { id: 2, name: "Defenseman" },
  { id: 1, name: "Goalie" },
];

const Selects = ({ players }: Props) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPosition = Number(searchParams.get("playerOrd"));
  const currentTeam = Number(searchParams.get("teamId"));
  const currentNation = Number(searchParams.get("nationId"));
  const isAnyFilterActive = currentPosition || currentTeam || currentNation;
  const currentTab = searchParams.get("tab");
  const isAllTimeTab = currentTab === "two";

  type NormalizedPlayer = {
    player_id: number;
    team_id: number;
    club_name: string;
    nation_id: number;
    player_nation: string;
    player_flag: string;
    player_order: number;
  };

  const normalizedPlayers: NormalizedPlayer[] = players.map((player) => ({
    player_id: player.player_id,
    team_id: player.team_id || 0,
    club_name: player.full_name || "",
    nation_id: player.nation_id || 0,
    player_nation: player.player_nation || "",
    player_flag: player.player_flag || "",
    player_order: player.player_order,
  }));

  const teams: Team[] = [
    ...new Map(
      normalizedPlayers.map((player) => [
        player.team_id,
        {
          id: player.team_id,
          name: player.club_name,
        },
      ]),
    ).values(),
  ].sort((a, b) => a.name.localeCompare(b.name));

  const nations: Nation[] = Object.values(
    Array.from(
      normalizedPlayers
        .reduce((accByPlayer: Map<number, NormalizedPlayer>, player) => {
          if (!accByPlayer.has(player.player_id)) {
            accByPlayer.set(player.player_id, player);
          }
          return accByPlayer;
        }, new Map())
        .values(),
    ).reduce((accByNation: Record<number, Nation>, player) => {
      const { nation_id, player_nation, player_flag } = player;
      if (nation_id && player_nation) {
        if (!accByNation[nation_id]) {
          accByNation[nation_id] = {
            nation_id,
            player_nation,
            player_flag,
          };
        }
      }
      return accByNation;
    }, {}),
  );

  const handlePositionChange = (event: SelectChangeEvent<number>) => {
    if (event.target.value === 0) {
      const newParams = deleteParams(searchParams, ["playerOrd"]);
      navigate(`?${newParams.toString()}`);
    } else {
      navigateWithParams(navigate, searchParams, {
        playerOrd: event.target.value,
      });
    }
  };

  const handleTeamChange = (event: SelectChangeEvent<number>) => {
    if (Number(event.target.value) === 0) {
      const newParams = deleteParams(searchParams, ["teamId"]);
      navigate(`?${newParams.toString()}`);
    } else {
      navigateWithParams(navigate, searchParams, {
        teamId: event.target.value,
      });
    }
  };

  const handleNationChange = (event: SelectChangeEvent<number>) => {
    if (Number(event.target.value) === 0) {
      const newParams = deleteParams(searchParams, ["nationId"]);
      navigate(`?${newParams.toString()}`);
    } else {
      navigateWithParams(navigate, searchParams, {
        nationId: event.target.value,
      });
    }
  };

  const handleReset = () => {
    const newParams = deleteParams(searchParams, [
      "playerOrd",
      "teamId",
      "nationId",
    ]);
    navigate(`?${newParams.toString()}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 4, md: 2 }}>
        <FormControl fullWidth size="small">
          <Select
            labelId="positions-label"
            id="positions-select"
            value={currentPosition || 0}
            onChange={handlePositionChange}
            sx={{ backgroundColor: "white" }}
          >
            {positions.map((position: Position) => (
              <MenuItem key={position.id} value={position.id}>
                {position.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 8, md: 4 }}>
        <FormControl fullWidth size="small">
          <Select
            id="teams-select"
            defaultValue={0}
            value={currentTeam}
            onChange={handleTeamChange}
            disabled={isAllTimeTab}
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="0">All Teams</MenuItem>
            {teams.map((team: Team) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <FormControl fullWidth size="small">
          <Select
            id="nations-select"
            defaultValue={0}
            value={currentNation}
            onChange={handleNationChange}
            sx={{ backgroundColor: "white" }}
          >
            <MenuItem value="0">All Nationalities</MenuItem>
            {nations.map((nation: Nation) => (
              <MenuItem key={nation.nation_id} value={nation.nation_id}>
                <Box display="flex" alignItems="center">
                  <Box display="flex" sx={{ mr: 1 }}>
                    <TableFlag alt="" src={nation.player_flag} />
                  </Box>
                  {nation.player_nation}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 6, md: 3 }} alignContent={"center"} textAlign={"end"}>
        <AppButton
          size="small"
          text="Reset Filter"
          iconName="reset"
          disabled={!isAnyFilterActive}
          onClick={handleReset}
          color="success"
        />
      </Grid>
    </Grid>
  );
};

export default Selects;
