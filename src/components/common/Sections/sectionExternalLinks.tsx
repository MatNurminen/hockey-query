import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import BarChartIcon from "@mui/icons-material/BarChart";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import type { TExternalLinksDto } from "../../../api/external-links/types";

interface Props {
  title: string;
  links?: TExternalLinksDto | null;
}

const SectionExternalLinks = ({ title, links }: Props) => {
  const linkItems = [
    { id: 0, icon: <LanguageIcon />, href: links?.home },
    { id: 1, icon: <BarChartIcon />, href: links?.stats },
    { id: 2, icon: <SportsHockeyIcon />, href: links?.elite },
  ].filter(({ href }) => Boolean(href));

  return (
    <>
      <Typography align="center" variant="body2">
        {title} external links
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          my: 1,
        }}
      >
        {linkItems.map(({ id, icon, href }) => (
          <Tooltip key={id} title={href}>
            <IconButton
              size="small"
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={href}
              sx={{
                color: "common.black",
                backgroundColor: "extra.zebraBG",
                "&:hover": { backgroundColor: "#9db1bb" },
              }}
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </>
  );
};

export default SectionExternalLinks;
