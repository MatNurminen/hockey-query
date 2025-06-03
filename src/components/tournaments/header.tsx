import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import SectionHeader from '../common/Sections/sectionHeader';
import SelectLeague from '../common/Selects/selectLeague';
import GreenButton from '../common/Buttons/greenButton';
import AddTournament from '../admin/tournaments/addTournament';

type HeaderProps = {
  leagueId: string;
};

const Header = ({ leagueId }: HeaderProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //setSelectedValue(value);
  };

  return (
    <>
      <SectionHeader txtAlign='left' content='Tournaments' />
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid size={{ xs: 3 }}>
          <SelectLeague />
        </Grid>
        <Grid>
          <GreenButton
            size='small'
            onClick={handleClickOpen}
            iconIndex={0}
            text='Add Tournament'
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

export default Header;
