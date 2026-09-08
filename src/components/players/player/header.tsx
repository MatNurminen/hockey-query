import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import MainLogo from "../../common/Images/mainLogo";
import { memo, useState } from "react";
import UpdatePlayer from "../../admin/players/updatePlayer";
import { TPlayerDto } from "../../../api/players/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinkRoute from "../../common/LinkRoute";
import { TPlayerStatDetail } from "../../../api/players-stats/types";
import CardMedia from "@mui/material/CardMedia";
import Facts from "./facts";
import AppButton from "../../common/Buttons/appButton";

interface Props {
  player: TPlayerDto;
  playerId: number;
  lastTeam: TPlayerStatDetail | null;
}

const Header = ({ player, playerId, lastTeam }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container pt={2} spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent
              sx={(theme) => ({ backgroundColor: theme.palette.extra.menuBG })}
            >
              <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Grid size={{ xs: 12, sm: 2 }}>
                  <MainLogo alt="" src={player.nation.flag} />
                </Grid>
                <Grid size={12}>
                  <Typography color="common.white" variant="h4">
                    {`# ${player.jersey_number} ${player.first_name} ${player.last_name}`}
                  </Typography>
                </Grid>
                <Grid size={12}>
                  {lastTeam ? (
                    <Box sx={{ color: "common.white" }}>
                      <Typography gutterBottom variant="body1">
                        {lastTeam.name} {" - "}
                        <LinkRoute
                          underline="hover"
                          to={`/teams/${lastTeam.team_id}`}
                          color={"common.white"}
                        >
                          {lastTeam.full_name}
                        </LinkRoute>{" "}
                        {" / "}
                        <LinkRoute
                          underline="hover"
                          to={`/leagues/${lastTeam.league_id}`}
                          color={"common.white"}
                        >
                          {lastTeam.short_name}
                        </LinkRoute>
                      </Typography>
                    </Box>
                  ) : null}
                </Grid>
              </Grid>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ my: 2, height: 120, objectFit: "contain" }}
              image={player.nation.logo}
              alt="Nation logo"
            />
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Facts player={player} />
        </Grid>
        <Grid textAlign="right" size={{ xs: 12 }}>
          <AppButton
            text="Edit Player"
            onClick={handleOpen}
            size="small"
            color="success"
            iconName="edit"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          />
        </Grid>
      </Grid>
      <UpdatePlayer playerId={playerId} open={open} onClose={handleClose} />
    </>
  );
};

export default memo(Header);
