import { memo, useState } from "react";
import Tab from "@mui/material/Tab";
import StyledTabs from "../../common/Tabs/styledTabs";
import HighlightsTab from "./highlightsTab";

interface Props {
  playerName: string;
  playerId: number;
}

interface Item {
  id: number;
  title: string;
  headerCells: {
    text: string;
  }[];
}

const items: Item[] = [
  {
    id: 0,
    title: "season",
    headerCells: [{ text: "Season" }, { text: "Awards By Season" }],
  },
  { id: 1, title: "league", headerCells: [{ text: "Awards By League" }] },
];

const Highlights = ({ playerName, playerId }: Props) => {
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
            <HighlightsTab
              playerName={playerName}
              headerCells={item.headerCells}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default memo(Highlights);
