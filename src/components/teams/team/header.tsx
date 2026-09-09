import { memo, useState } from "react";
import Grid from "@mui/material/Grid2";
import SectionHeader from "../../common/Sections/sectionHeader";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MainLogo from "../../common/Images/mainLogo";
import AppButton from "../../common/Buttons/appButton";
import UpdateTeam from "../../admin/teams/updateTeam";
import SectionChapter from "../../common/Sections/sectionChapter";
import { TTeamDto } from "../../../api/teams/types";

interface Props {
  team: TTeamDto;
}

const Header = ({ team }: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const facts = [
    { label: "Country", value: team.nation.name },
    { label: "Founded", value: team.start_year },
  ];

  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ sm: 12, md: 6 }}>
          <Grid
            container
            spacing={{ md: 8 }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            mt={{ xs: 2, md: 0 }}
            my={{ md: 2 }}
          >
            <Grid size={{ xs: 12, sm: 2 }}>
              <MainLogo alt="" src={team.nation.flag} />
            </Grid>
            <Grid size={{ xs: 12, sm: 9 }}>
              <SectionHeader txtAlign="left" content={team.full_name} />
            </Grid>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Stack
              direction="row"
              flexWrap="wrap"
              useFlexGap
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              {team.logos
                .toSorted((a, b) => a.start_year - b.start_year)
                .map((logo) => (
                  <Box key={logo.id} textAlign="center">
                    <MainLogo src={logo.logo} alt="" />
                    <Typography variant="body1" gutterBottom>
                      {logo.start_year} - {logo.end_year}
                    </Typography>
                  </Box>
                ))}
            </Stack>
          </Grid>
        </Grid>
        <Grid my={3} size={{ xs: 12, md: 6 }}>
          <SectionChapter content="Team Facts" />
          <TableContainer component={Paper}>
            <Table size="small">
              <TableBody>
                {facts.map((fact) => (
                  <TableRow key={fact.label}>
                    <TableCell>{fact.label}</TableCell>
                    <TableCell>{fact.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          textAlign="right"
          size={{ xs: 12 }}
          sx={{
            mb: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
          }}
        >
          <AppButton
            text="Edit Team"
            onClick={handleOpen}
            size="small"
            iconName="edit"
            color="success"
          />
        </Grid>
        <UpdateTeam teamId={team.id} open={open} onClose={handleClose} />
      </Grid>
    </>
  );
};

export default memo(Header);
