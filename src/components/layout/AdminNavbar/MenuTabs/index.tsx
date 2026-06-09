import { useState } from "react";
import Tab from "@mui/material/Tab";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import LinkRoute from "../../../common/LinkRoute";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AddTeam from "../../../admin/teams/addTeam";
import AddNation from "../../../admin/nations/addNation";
import AddPlayer from "../../../admin/players/addPlayer";
import AddLeague from "../../../admin/leagues/addLeague";

function MenuTabs() {
  const [openPlayer, setOpenPlayer] = useState(false);
  const [openNation, setOpenNation] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [openLeague, setOpenLeague] = useState(false);

  const handleOpenNation = () => {
    setOpenNation(true);
  };

  const handleOpenLeague = () => {
    setOpenLeague(true);
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
    setOpenLeague(false);
  };

  const tabItems = [
    {
      label: "Add Nation",
      icon: <AddLocationAltIcon />,
      onclick: handleOpenNation,
    },
    { label: "Add League", icon: <PostAddIcon />, onclick: handleOpenLeague },
    { label: "Add Team", icon: <GroupAddIcon />, onclick: handleOpenTeam },
    {
      label: "Add Player",
      icon: <PersonAddIcon />,
      onclick: handleOpenPlayer,
    },
    { label: "Edit Player", path: "/players", icon: <HowToRegIcon /> },
    { label: "Add Roster", path: "", icon: <GroupAddIcon /> },
    { label: "Tournaments", path: "/tournaments", icon: <PostAddIcon /> },
  ];

  return (
    <>
      <Stack
        width={"100%"}
        divider={<Divider orientation="vertical" flexItem />}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mx={"auto"}
      >
        {tabItems.map((tab, key) => (
          <Tab
            key={key}
            value={false}
            icon={tab.icon}
            label={tab.label}
            {...(tab.path
              ? { component: LinkRoute, to: tab.path }
              : { onClick: tab.onclick })}
          />
        ))}
      </Stack>
      <AddPlayer open={openPlayer} onClose={handleClose} />
      <AddNation open={openNation} onClose={handleClose} />
      <AddTeam open={openTeam} onClose={handleClose} />
      <AddLeague open={openLeague} onClose={handleClose} />
    </>
  );
}

export default MenuTabs;
