import { useNavigate, useSearchParams } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import GreenButton from "../../common/Buttons/greenButton";

const positions = [
  { id: 3, name: "Forward" },
  { id: 2, name: "Defenseman" },
  { id: 1, name: "Goalie" },
];

const Selects = ({ players }: any) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentPosition = Number(searchParams.get("playerOrd"));
  const currentTeam = Number(searchParams.get("teamId"));
  const currentNation = Number(searchParams.get("nationId"));
  const isAnyFilterActive = currentPosition || currentTeam || currentNation;

  const teams = [
    ...new Map(
      players[0].list.map((team: any) => [
        team.team_id,
        {
          id: team.team_id,
          name: team.full_name,
        },
      ]),
    ).values(),
  ].sort((a: any, b: any) => a.name.localeCompare(b.name));

  const nations = Object.values(
    players[0].list.reduce((acc: any, player: any) => {
      const { nation_id, player_nation, player_flag } = player;
      if (!acc[nation_id]) {
        acc[nation_id] = { nation_id, player_nation, player_flag, count: 0 };
      }
      acc[nation_id].count++;
      return acc;
    }, {}),
  ).sort((a: any, b: any) => a.player_nation.localeCompare(b.player_nation));

  const handlePositionChange = (event: SelectChangeEvent<number>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("playerOrd", String(event.target.value));
    navigate(`?${newParams.toString()}`);
  };

  const handleTeamChange = (event: SelectChangeEvent<number>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("teamId", String(event.target.value));
    navigate(`?${newParams.toString()}`);
  };

  const handleNationChange = (event: SelectChangeEvent<number>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("nationId", String(event.target.value));
    navigate(`?${newParams.toString()}`);
  };

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("playerOrd");
    newParams.delete("teamId");
    newParams.delete("nationId");
    navigate(`?${newParams.toString()}`);
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 2 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="positions-label">All Positions</InputLabel>
          <Select
            labelId="positions-label"
            id="positions-select"
            label="All positions"
            value={currentPosition || ""}
            onChange={handlePositionChange}
          >
            {positions.map((position: any) => (
              <MenuItem key={position.id} value={position.id}>
                {position.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 4 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="teams-label">All Teams</InputLabel>
          <Select
            labelId="teams-label"
            id="teams-select"
            label="All teams"
            value={currentTeam || ""}
            onChange={handleTeamChange}
          >
            {teams.map((team: any) => (
              <MenuItem key={team.id} value={team.id}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="nations-label">All Nationalities</InputLabel>
          <Select
            labelId="nations-label"
            id="nations-select"
            label="All Nationalities"
            value={currentNation || ""}
            onChange={handleNationChange}
          >
            {nations.map((nation: any) => (
              <MenuItem key={nation.nation_id} value={nation.nation_id}>
                <Box display="flex" alignItems="center">
                  <Box display="flex" sx={{ mr: 1 }}>
                    <TableFlag alt="" src={nation.player_flag} />
                  </Box>
                  {nation.player_nation} ({nation.count})
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 3 }} alignContent={"center"} textAlign={"end"}>
        <GreenButton
          size="small"
          text="Reset Filter"
          iconIndex={6}
          disabled={!isAnyFilterActive}
          onClick={handleReset}
        />
      </Grid>
    </Grid>
  );
};

export default Selects;
