import { useState } from 'react';
import Tab from '@mui/material/Tab';
import StyledTabs from '../../common/Tabs/styledTabs';
import HighlightsTab from './highlightsTab';

const Highlights = ({ playerName, playerId }: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const items: { id: number; title: string; headerCells: any }[] = [
    {
      id: 0,
      title: 'season',
      headerCells: [{ text: 'Season' }, { text: 'Awards By Season' }],
    },
    { id: 1, title: 'league', headerCells: [{ text: 'Awards By League' }] },
  ];

  return (
    <>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label='stats'
        variant='fullWidth'
      >
        {items.map((item: any) => (
          <Tab key={item.id} label={item.title} />
        ))}
      </StyledTabs>
      {items.map((item) => (
        <div key={item.id} hidden={value !== item.id}>
          {value === item.id && (
            <HighlightsTab
              playerName={playerName}
              playerId={playerId}
              headerCells={item.headerCells}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default Highlights;
