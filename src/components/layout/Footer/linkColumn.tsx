import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import LinkRoute from "../../common/LinkRoute";
import Box from "@mui/material/Box";

export interface LinkItem {
  label: string;
  to: string;
}

interface LinkColumnProps {
  title: string;
  links: LinkItem[];
  size?: number;
}

const LinkColumn = ({ title, links, size = 3 }: LinkColumnProps) => (
  <Grid size={size}>
    <Box mb={1}>
      <Typography
        variant="caption"
        sx={(theme) => ({
          textTransform: "uppercase",
          color: theme.palette.common.white,
        })}
      >
        {title}
      </Typography>
    </Box>
    <Stack spacing={0.5}>
      {links.map((link) => (
        <LinkRoute
          key={link.to}
          variant="caption"
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
