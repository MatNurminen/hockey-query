import Tab from '@mui/material/Tab';
import StyledTabs from '../../common/Tabs/styledTabs';
import { useState } from 'react';
import StatsTab from './statsTab';

const Stats = ({ playerName, playerId, setLastTeam }: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const items: { id: number; title: string; typeId: number }[] = [
    { id: 0, title: 'Leagues', typeId: 1 },
    { id: 1, title: 'International', typeId: 2 },
    { id: 2, title: 'Tournaments', typeId: 3 },
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

export default Stats;
