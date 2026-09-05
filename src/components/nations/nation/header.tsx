import Grid from "@mui/material/Grid2";
import SectionHeader from "../../common/Sections/sectionHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import HeaderMain from "../../common/Table/headerMain";
import MainLogo from "../../common/Images/mainLogo";
import { getPlayersCountByNation } from "../../../api/players/queries";
import { getTeamsCountByNation } from "../../../api/teams/queries";
import AppButton from "../../common/Buttons/appButton";
import { memo, useState } from "react";
import UpdateNation from "../../admin/nations/updateNation";
import { TNationDto } from "../../../api/nations/types";

interface Props {
  nation: TNationDto;
  nationId: number;
}

const Header = ({ nation, nationId }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    data: plrs,
    isError: plrsError,
    isLoading: plrsLoading,
  } = getPlayersCountByNation(nationId);
  const {
    data: tms,
    isError: tmsError,
    isLoading: tmsLoading,
  } = getTeamsCountByNation(nationId);

  if (plrsLoading || tmsLoading) return <h3>Loading...</h3>;
  if (plrsError || tmsError) return <h3>Error!</h3>;
  const playersCount = plrs || 0;
  const teamsCount = tms || 0;

  return (
    <>
      <Grid container mb={2}>
        <Grid my={{ md: 2 }} size={{ xs: 12, md: 6 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid>
              <MainLogo alt="" src={nation.flag} />
            </Grid>
            <Grid>
              <SectionHeader
                txtAlign="left"
                content={nation.name + ", " + nation.short_name}
              />
            </Grid>
          </Grid>
          <Grid container ml={2} spacing={{ xs: 2, md: 4 }} mt={3}>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: nation.color,
                  border: "2px solid #ccc",
                }}
              />
            </Grid>
            <Grid>
              <MainLogo alt={nation.name} src={nation.logo} />
            </Grid>
          </Grid>
        </Grid>
        <Grid mt={2} size={{ xs: 12, md: 6 }}>
          <TableContainer component={Paper}>
            <Table size="small">
              <HeaderMain cells={[`DATABASE STATS - ${nation.name}`, ""]} />
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Box>Players in database</Box>
                  </TableCell>
                  <TableCell>
                    <Box>{playersCount}</Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box>Teams in database</Box>
                  </TableCell>
                  <TableCell>
                    <Box>{teamsCount}</Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid textAlign="right" size={{ xs: 12 }}>
          <AppButton
            text="Edit Nation"
            onClick={handleOpen}
            size="small"
            color="success"
            iconName="edit"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          />
        </Grid>
      </Grid>
      <UpdateNation nationId={nationId} open={open} onClose={handleClose} />
    </>
  );
};

export default memo(Header);
