import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import AddTeam from "../../../admin/teams/addTeam";
import AddNation from "../../../admin/nations/addNation";
import AddPlayer from "../../../admin/players/addPlayer";
import AddLeague from "../../../admin/leagues/addLeague";
import AddTournament from "../../../admin/tournaments/addTournament";
import type { ReactElement } from "react";
import { useFirstLeague } from "../../../../hooks/useFirstLeague";

interface ActionButtonItem {
  label: string;
  icon: ReactElement;
  onClick: () => void;
}

type DialogName = "player" | "nation" | "team" | "league" | "tournament";

function MenuTabs() {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState<DialogName | null>(null);
  const { firstLeagueId } = useFirstLeague();

  const handleClose = () => setOpenDialog(null);

  const buttonItems: ActionButtonItem[] = [
    {
      label: "Add Nation",
      icon: <AddLocationAltIcon />,
      onClick: () => setOpenDialog("nation"),
    },
    {
      label: "Add League",
      icon: <PostAddIcon />,
      onClick: () => setOpenDialog("league"),
    },
    {
      label: "Add Team",
      icon: <GroupAddIcon />,
      onClick: () => setOpenDialog("team"),
    },
    {
      label: "Add Player",
      icon: <PersonAddIcon />,
      onClick: () => setOpenDialog("player"),
    },
    {
      label: "Add Tournament",
      icon: <AddBusinessIcon />,
      onClick: () => setOpenDialog("tournament"),
    },
  ];

  return (
    <>
      <Stack
        width="100%"
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
        mx="auto"
      >
        {buttonItems.map((item) => (
          <Button
            key={item.label}
            startIcon={item.icon}
            color="inherit"
            onClick={item.onClick}
            sx={{
              color: theme.palette.extra.adminMenuText,
              flexDirection: "column",
              gap: "4px",
              minHeight: 48,
              textDecoration: "none",
            }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
      {openDialog === "player" && <AddPlayer open onClose={handleClose} />}
      {openDialog === "nation" && <AddNation open onClose={handleClose} />}
      {openDialog === "team" && <AddTeam open onClose={handleClose} />}
      {openDialog === "league" && <AddLeague open onClose={handleClose} />}
      {openDialog === "tournament" && (
        <AddTournament leagueId={firstLeagueId} open onClose={handleClose} />
      )}
    </>
  );
}

export default MenuTabs;
