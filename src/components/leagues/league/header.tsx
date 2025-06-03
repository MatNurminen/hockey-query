import Box from '@mui/material/Box';
import SectionFirst from '../../common/Sections/sectionFirst';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import SectionHeader from '../../common/Sections/sectionHeader';
import MainLogo from '../../common/Images/mainLogo';
import GreenButton from '../../common/Buttons/greenButton';
import { memo, useState } from 'react';
import UpdateLeague from '../../admin/leagues/updateLeague';

const Header = ({ league }: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='space-around'
        alignItems='center'
      >
        <Grid size={{ xs: 6 }}>
          <SectionHeader txtAlign='left' content={league.name} />
        </Grid>
        <Grid size={{ xs: 6 }} container justifyContent='flex-end'>
          <GreenButton
            text='Edit League'
            onClick={handleOpen}
            size='small'
            iconIndex={1}
          />
        </Grid>
      </Grid>

      <Box mt={-3}>
        <SectionFirst txtAlign='left' content={league.short_name} />
      </Box>

      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='center'
        textAlign='center'
      >
        {league.logos.map((logo: any, key: any) => (
          <Grid key={key} size={{ xs: 2 }}>
            <MainLogo src={logo.logo} />
            <Typography variant='body1' gutterBottom>
              {logo.start_year} - {logo.end_year}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <UpdateLeague leagueId={league.id} open={open} onClose={handleClose} />
    </>
  );
};

export default memo(Header);
