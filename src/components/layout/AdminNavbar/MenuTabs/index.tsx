import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import LinkRoute from "../../../common/LinkRoute";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AddTeam from "../../../admin/teams/addTeam";
import AddNation from "../../../admin/nations/addNation";
import AddPlayer from "../../../admin/players/addPlayer";
import AddLeague from "../../../admin/leagues/addLeague";
import AddTournament from "../../../admin/tournaments/addTournament";
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
  const theme = useTheme();
  const [openPlayer, setOpenPlayer] = useState(false);
  const [openNation, setOpenNation] = useState(false);
  const [openTeam, setOpenTeam] = useState(false);
  const [openLeague, setOpenLeague] = useState(false);
  const [openTournment, setOpenTournament] = useState(false);

  const handleClose = () => {
    setOpenPlayer(false);
    setOpenNation(false);
    setOpenTeam(false);
    setOpenLeague(false);
    setOpenTournament(false);
  };

  const getTabProps = (tab: TabItem) => {
    if ("path" in tab) {
      return {
        component: LinkRoute,
        to: tab.path,
        sx: {
          textDecoration: "none",
        },
      };
    }
    return { onClick: tab.onClick };
  };

  const tabItems: TabItem[] = [
    {
      label: "Add Nation",
      icon: <AddLocationAltIcon />,
      onClick: () => setOpenNation(true),
    },
    {
      label: "Add League",
      icon: <PostAddIcon />,
      onClick: () => setOpenLeague(true),
    },
    {
      label: "Add Team",
      icon: <GroupAddIcon />,
      onClick: () => setOpenTeam(true),
    },
    {
      label: "Add Player",
      icon: <PersonAddIcon />,
      onClick: () => setOpenPlayer(true),
    },
    {
      label: "Add Tournament",
      icon: <AddBusinessIcon />,
      onClick: () => setOpenTournament(true),
    },
  ];

  return (
    <>
      <Stack
        width={"100%"}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: theme.palette.extra.menuDividerBG }}
          />
        }
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mx={"auto"}
      >
        {tabItems.map((tab, key) => (
          <Tab
            key={key}
            icon={tab.icon}
            label={tab.label}
            {...getTabProps(tab)}
          />
        ))}
      </Stack>
      {openPlayer && <AddPlayer open onClose={handleClose} />}
      {openNation && <AddNation open onClose={handleClose} />}
      {openTeam && <AddTeam open onClose={handleClose} />}
      {openLeague && <AddLeague open onClose={handleClose} />}
      {openTournment && <AddTournament leagueId={1} open onClose={handleClose} />}
    </>
  );
}

export default MenuTabs;
