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
import type { ReactElement } from "react";

interface ActionTabItem {
  label: string;
  icon: ReactElement;
  onClick: () => void;
}

interface LinkTabItem {
  label: string;
  icon: ReactElement;
  path: string;
}

type TabItem = ActionTabItem | LinkTabItem;

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

  const getTabProps = (tab: TabItem) => {
    if ("path" in tab) {
      return {
        component: LinkRoute,
        to: tab.path,
        sx: {
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "none",
          },
        },
      };
    }
    return { onClick: tab.onClick };
  };

  const tabItems: TabItem[] = [
    {
      label: "Add Nation",
      icon: <AddLocationAltIcon />,
      onClick: handleOpenNation,
    },
    { label: "Add League", icon: <PostAddIcon />, onClick: handleOpenLeague },
    { label: "Add Team", icon: <GroupAddIcon />, onClick: handleOpenTeam },
    {
      label: "Add Player",
      icon: <PersonAddIcon />,
      onClick: handleOpenPlayer,
    },
    { label: "Edit Player", path: "/players", icon: <HowToRegIcon /> },
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
            {...getTabProps(tab)}
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
