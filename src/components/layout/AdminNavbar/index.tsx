import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import MenuTabs from "./MenuTabs";

const AdminNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  if (isMobile) return null;

  return (
    <AppBar
      elevation={0}
      sx={{ backgroundColor: "#042e41" }}
      position="static"
    >
      <Container>
        <MenuTabs />
      </Container>
    </AppBar>
  );
};

export default AdminNavbar;
