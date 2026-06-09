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

  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          {pages.map((page, key) => (
            <ListItemButton key={key} component={LinkRoute} to={page.to}>
              <ListItemText primary={page.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton color="inherit" onClick={() => setOpenDrawer(prev => !prev)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default MenuDrawer;
