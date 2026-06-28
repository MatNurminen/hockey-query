import { memo } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
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

const LinkColumn = ({ title, links, size = { xs: 4, md: 3 } }: LinkColumnProps) => (
  <Grid size={size}>
    <Typography
      variant="subtitle2"
      sx={{
        fontWeight: 500,
        textTransform: "uppercase",
        mb: 2,
        color: "#fff",
      }}
    >
      {title}
    </Typography>
    <Stack spacing={0.5}>
      {links.map((link) => (
        <Link
          key={link.to}
          underline="hover"
          color="rgba(255,255,255,0.5)"
          component={LinkRoute}
          to={link.to}
        >
          <Typography variant="body2">{link.label}</Typography>
        </Link>
      ))}
    </Stack>
  </Grid>
);

export default memo(LinkColumn);
