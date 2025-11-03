import Grid from '@mui/material/Grid2';
import SectionHeader from '../../common/Sections/sectionHeader';
import AppButton from '../../common/Buttons/appButton';
import { memo, useState } from 'react';
import AddLeague from '../../admin/leagues/addLeague';

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Grid>
          <SectionHeader txtAlign='left' content='Leagues' />
        </Grid>
        <Grid>
          <AppButton
            onClick={handleOpen}
            text='Add League'
            size='small'
            color='success'
            iconName='add'
          />
        </Grid>
      </Grid>
      <AddLeague open={open} onClose={handleClose} />
    </>
  );
};

export default memo(Header);
