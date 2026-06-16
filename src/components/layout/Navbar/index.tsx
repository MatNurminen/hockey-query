import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import MenuDrawer from "./MenuDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import LinkRoute from "../../common/LinkRoute";
import { useLatestSeason } from "../../../hooks/useLatestSeason";

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { startYear: lastSeason } = useLatestSeason();

  const pages = [
    { label: "Tournaments", to: "/tournaments" },
    { label: "Teams", to: "/teams" },
    { label: "Leagues", to: "/leagues" },
    { label: "Nations", to: "/nations" },
    { label: "Free Agents", to: `/free-agents?season=${lastSeason}&nation=1` },
    { label: "Drafts", to: "/drafts" },
  ];

  return (
    <AppBar elevation={0} sx={{ backgroundColor: "#063950" }} position="static">
      <Container sx={{ my: 2 }}>
        <Toolbar>
          <LinkRoute
            to="/"
            sx={{
              display: "block",
              width: "8%",
            }}
          >
            <img
              src="/img/logo.png"
              alt="Logo"
              style={{
                display: "block",
                width: "100%",
              }}
            />
          </LinkRoute>
          {isMobile ? (
            <Box
              sx={{
                ml: "auto",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button variant="contained" color="success">
                Sign In
              </Button>
              <MenuDrawer pages={pages} />
            </Box>
          ) : (
            <Stack direction="row" sx={{ ml: "auto", alignItems: "center" }}>
              {pages.map((page, key) => (
                <Tab
                  key={key}
                  sx={{
                    mx: 4,
                    p: 0,
                    textDecoration: "none",
                    color: "#fff",
                    opacity: 1,
                    fontWeight: "bold",
                  }}
                  label={page.label}
                  to={page.to}
                  component={LinkRoute}
                  underline="none"
                />
              ))}
              <Button sx={{ ml: "auto" }} variant="contained" color="success">
                Sign In
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
