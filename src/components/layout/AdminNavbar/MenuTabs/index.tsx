import { useState } from 'react';
import Tab from '@mui/material/Tab';
//import styles from './styles';
import PublicIcon from '@mui/icons-material/Public';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import LinkRoute from '../../../common/LinkRoute';
//import AddPlayer from '../../../admin/players/addPlayer';
//import AddNation from '../../../admin/nations/addNation';
import Typography from '@mui/material/Typography';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddTeam from '../../../admin/teams/addTeam';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddNation from '../../../admin/nations/addNation';
import AddPlayer from '../../../admin/players/addPlayer';

//function MenuTabs({ classes }: any) {
function MenuTabs() {
  const [openPlayer, setOpenPlayer] = useState(false);
  const [openNation, setOpenNation] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);

  const handleOpenNation = () => {
    setOpenNation(true);
  };

  const handleOpenTeam = () => {
    setOpenTeam(true);
  };

  const handleOpenPlayer = () => {
    setOpenPlayer(true);
  };

  const handleClose = () => {
    setOpenPlayer(false);
    setOpenNation(false);
    setOpenTeam(false);
  };

  const ButtonInTabs = () => {
    //return <Button className={classes.tab}>ewdewdew</Button>;
    return <Button>ewdewdew</Button>;
  };

  const tabItems = [
    {
      label: 'Add Nation',
      icon: <AddLocationAltIcon />,
      onclick: handleOpenNation,
    },
    { label: 'Rosters', path: '/rosters', icon: <AllInboxIcon /> },
    { label: 'Add Team', icon: <GroupAddIcon />, onclick: handleOpenTeam },
    {
      label: 'Add Player',
      icon: <PersonAddIcon />,
      onclick: handleOpenPlayer,
    },
    { label: 'Edit Player', path: '/players', icon: <HowToRegIcon /> },
    { label: 'Add Roster', path: '', icon: <GroupAddIcon /> },
    { label: 'Add Championship', path: '/champ', icon: <PostAddIcon /> },
  ];

  return (
    <>
      <Stack
        width={'100%'}
        divider={
          // <Divider orientation='vertical' flexItem className={classes.dv} />
          <Divider orientation='vertical' flexItem />
        }
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        mx={'auto'}
      >
        {tabItems.map((tab, key) => (
          <Tab
            key={key}
            value={false}
            icon={tab.icon}
            label={tab.label}
            sx={
              {
                //opacity: '1',
              }
            }
            //deal with links
            component={LinkRoute}
            to={tab.path}
          />
        ))}
        <ButtonInTabs />
      </Stack>
      <AddPlayer open={openPlayer} onClose={handleClose} />
      <AddNation open={openNation} onClose={handleClose} />
      <AddTeam open={openTeam} onClose={handleClose} />
    </>
  );
}

//export default styles(MenuTabs);
export default MenuTabs;
