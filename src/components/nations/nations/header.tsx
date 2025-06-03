import Grid from '@mui/material/Grid2';
import SectionHeader from '../../common/Sections/sectionHeader';
import GreenButton from '../../common/Buttons/greenButton';
import { memo, useState } from 'react';
import AddNation from '../../admin/nations/addNation';

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
          <SectionHeader txtAlign='left' content='Nations' />
        </Grid>
        <Grid>
          <GreenButton
            onClick={handleOpen}
            text='Add Nation'
            size='small'
            iconIndex={0}
          />
        </Grid>
      </Grid>
      <AddNation open={open} onClose={handleClose} />
    </>
  );
};

export default memo(Header);
