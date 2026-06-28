import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { memo } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkRoute from "../../common/LinkRoute";
import { useLatestSeason } from "../../../hooks/useLatestSeason";
import LinkColumn from "./linkColumn";

const getNationsLinks = (startYear: number) => [
  { label: "Sweden", to: `/nations/15?season=${startYear}` },
  { label: "Canada", to: `/nations/5?season=${startYear}` },
  { label: "USA", to: `/nations/18?season=${startYear}` },
  { label: "Finland", to: `/nations/7?season=${startYear}` },
  { label: "Germany", to: `/nations/3?season=${startYear}` },
  { label: "Switzerland", to: `/nations/16?season=${startYear}` },
  { label: "All Nations", to: `/nations` },
];

const getLeaguesLinks = (startYear: number) => [
  { label: "NHL", to: `/leagues/14?season=${startYear}` },
  { label: "KHL", to: `/leagues/1?season=${startYear}` },
  { label: "SHL", to: `/leagues/3?season=${startYear}` },
  { label: "AHL", to: `/leagues/15?season=${startYear}` },
  { label: "Liiga", to: `/leagues/2?season=${startYear}` },
  { label: "NLA", to: `/leagues/9?season=${startYear}` },
];

const getPagesLinks = (startYear: number) => [
  { label: "Free Agents", to: `/free-agents?season=${startYear}&nation=1` },
  { label: "Drafts", to: `/drafts` },
  { label: "Tournaments", to: `/tournaments` },
  { label: "Teams", to: `/teams` },
  { label: "Leagues", to: `/leagues` },
];

const Footer = () => {
  const { startYear } = useLatestSeason();

  const nations = getNationsLinks(startYear);
  const leagues = getLeaguesLinks(startYear);
  const pages = getPagesLinks(startYear);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#252525",
        color: "#fff",
        mt: 4,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container sx={{ mb: 4, justifyContent: "space-between" }}>
          <LinkColumn title="Popular Nations" links={nations} />
          <LinkColumn title="Popular Leagues" links={leagues} />
          <LinkColumn title="Popular Pages" links={pages} />
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 500,
                textTransform: "uppercase",
                mb: 2,
                color: "#fff",
              }}
            >
              Connect With Us
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MailOutlineIcon
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "1.25rem",
                  }}
                />
                <Link
                  href="mailto:contact@hockeyquery.com"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                    transition: "color 0.2s ease",
                  }}
                >
                  contact@hockeyquery.com
                </Link>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8125rem",
                }}
              >
                Tampere, Finland
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mb: 3 }} />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Link
            sx={{ width: 80 }}
            underline="none"
            component={LinkRoute}
            to="/"
          >
            <img
              src="/img/b_logo.png"
              alt="Logo"
              style={{
                display: "block",
                width: "100%",
              }}
            />
          </Link>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8125rem" }}
          >
            &copy; {new Date().getFullYear()} Hockey Query. All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default memo(Footer);
