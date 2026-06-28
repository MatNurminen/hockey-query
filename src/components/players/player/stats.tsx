import Tab from "@mui/material/Tab";
import StyledTabs from "../../common/Tabs/styledTabs";
import { memo, useState } from "react";
import StatsTab from "./statsTab";
import { TPlayerStatDetail } from "../../../api/players-stats/types";

interface Props {
  playerName: string;
  playerId: number;
  setLastTeam: React.Dispatch<React.SetStateAction<TPlayerStatDetail | null>>;
}

interface Items {
  id: number;
  title: string;
  typeId: number;
}

const items: Items[] = [
  { id: 0, title: "Leagues", typeId: 1 },
  { id: 1, title: "International", typeId: 2 },
  { id: 2, title: "Tournaments", typeId: 3 },
];

const Stats = ({ playerName, playerId, setLastTeam }: Props) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="stats"
        variant="fullWidth"
      >
        {items.map((item) => (
          <Tab key={item.id} label={item.title} />
        ))}
      </StyledTabs>
      {items.map((item) => (
        <div key={item.id} hidden={value !== item.id}>
          {value === item.id && (
            <StatsTab
              playerName={playerName}
              playerId={playerId}
              typeId={item.typeId}
              setLastTeam={setLastTeam}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default memo(Stats);
