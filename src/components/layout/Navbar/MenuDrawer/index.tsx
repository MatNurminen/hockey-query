import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LinkRoute from "../../../common/LinkRoute";

interface Props {
  pages: { label: string; to: string }[];
}

const MenuDrawer = ({ pages }: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleToggle = () => setOpenDrawer((prev) => !prev);
  const handleClose = () => setOpenDrawer(false);

  return (
    <>
      <Drawer open={openDrawer} onClose={handleClose}>
        <List>
          {pages.map((page) => (
            <ListItemButton key={page.label} component={LinkRoute} to={page.to} onClick={handleClose}>
              <ListItemText primary={page.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton color="inherit" onClick={handleToggle}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default MenuDrawer;
