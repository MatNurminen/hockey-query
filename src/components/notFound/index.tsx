import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

const NotFound = () => {
  return (
    <Box
      sx={(theme) => ({
        padding: 4,
        backgroundColor: theme.palette.extra.menuBG,
      })}
    >
      <Container>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <CardMedia
              sx={{ height: { xs: 200, md: 300 } }}
              image="/img/puck_spinning.gif"
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography color="common.white" variant="h1" fontWeight="bold">
              404
            </Typography>
            <Typography color="common.white" variant="h4">
              Not found
            </Typography>
            <Typography color="common.white">
              The link is broken or the page has been moved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
