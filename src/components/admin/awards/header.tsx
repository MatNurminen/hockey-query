import { memo, useState } from "react";
import SectionHeader from "../../common/Sections/sectionHeader";
import Grid from "@mui/material/Grid2";
import SelectLeague from "../../common/Selects/selectLeague";
import AppButton from "../../common/Buttons/appButton";
import AddAward from "./addAward";

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
      <SectionHeader txtAlign="left" content="Awards" />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid size={{ xs: 8, sm: 6, md: 3 }}>
          <SelectLeague value={String(leagueId)} />
        </Grid>
        <Grid>
          <AppButton
            size="small"
            onClick={handleClickOpen}
            iconName="add"
            text="Add Award"
            color="success"
            sx={{ display: { xs: "none", md: "inline-flex" } }}
          />
          <AddAward
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
