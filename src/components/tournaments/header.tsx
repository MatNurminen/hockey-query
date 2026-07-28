import Grid from "@mui/material/Grid2";
import { memo, useState } from "react";
import SectionHeader from "../common/Sections/sectionHeader";
import SelectLeague from "../common/Selects/selectLeague";
import AppButton from "../common/Buttons/appButton";
import AddTournament from "../admin/tournaments/addTournament";

type Props = {
  leagueId: number;
};

const Header = ({ leagueId }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SectionHeader txtAlign="left" content="Tournaments" />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid size={{ xs: 3 }}>
          <SelectLeague />
        </Grid>
        <Grid>
          <AppButton
            size="small"
            onClick={handleClickOpen}
            iconName="add"
            text="Add Tournament"
            color="success"
          />
          <AddTournament
            leagueId={leagueId}
            open={open}
            onClose={handleClose}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default memo(Header);
