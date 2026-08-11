import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import LinkRoute from "../../common/LinkRoute";

export interface LinkItem {
  label: string;
  to: string;
}

interface LinkColumnProps {
  title: string;
  links: LinkItem[];
  size?: { xs?: number; md?: number };
}

const LinkColumn = ({
  title,
  links,
  size = { xs: 4, md: 3 },
}: LinkColumnProps) => (
  <Grid size={size}>
    <Typography
      variant="subtitle2"
      sx={(theme) => ({
        fontWeight: 500,
        textTransform: "uppercase",
        mb: 2,
        color: theme.palette.common.white,
      })}
    >
      {title}
    </Typography>
    <Stack spacing={0.5}>
      {links.map((link) => (
        <LinkRoute
          key={link.to}
          variant="body2"
          sx={(theme) => ({ color: theme.palette.extra.footerTextMuted })}
          to={link.to}
        >
          {link.label}
        </LinkRoute>
      ))}
    </Stack>
  </Grid>
);

export default LinkColumn;
