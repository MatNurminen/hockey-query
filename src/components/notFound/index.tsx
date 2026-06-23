import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import { memo } from "react";

const NotFound = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: "#063950" }}>
      <Container>
        <Grid container justifyContent="center" alignItems="center">
          <Grid size={4}>
            <Typography sx={{ color: "#fff" }} variant="h1" fontWeight="bold">
              404
            </Typography>
            <Typography sx={{ color: "#fff" }} variant="h4">
              Not found
            </Typography>
            <Typography sx={{ color: "#fff" }}>
              The link is broken or the page has been moved.
            </Typography>
          </Grid>
          <Grid size={7}>
            <CardMedia sx={{ height: 300 }} image="/img/puck_spinning.gif" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default memo(NotFound);
