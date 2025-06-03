import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import styles from './styles';
import PublicIcon from '@mui/icons-material/Public';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Divider from '@mui/material/Divider';

const tabItems = [
  { label: 'Nations', path: '/countries', icon: <PublicIcon /> },
  { label: 'Leagues', path: '/leagues', icon: <AllInboxIcon /> },
  { label: 'Teams', path: '/teams', icon: <GroupIcon /> },
  {
    label: 'Add Player',
    path: '/players/create/new',
    icon: <PersonAddIcon />,
  },
  { label: 'Edit Player', path: '/players', icon: <HowToRegIcon /> },
  { label: 'Add Roster', path: '', icon: <GroupAddIcon /> },
  { label: 'Add Championship', path: '/champ', icon: <PostAddIcon /> },
];

function MenuTabs({ classes }: any) {
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Divider className={classes.dv} orientation='vertical' flexItem />
      {tabItems.map((tab, key) => (
        <>
          <Grid item xs textAlign={'center'}>
            <Tab
              key={key}
              value={false}
              className={classes.tab}
              icon={tab.icon}
              label={tab.label}
            />
          </Grid>
          <Divider className={classes.dv} orientation='vertical' flexItem />
        </>
      ))}
    </Grid>
  );
}

export default styles(MenuTabs);
