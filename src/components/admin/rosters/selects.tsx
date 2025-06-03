import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import SelectLeague from '../../common/Selects/selectLeague';
import SelectSeason from '../../common/Selects/selectSeason';

const Selects = () => {
  return (
    <Box sx={{ flexGrow: 1 }} mb={3}>
      <Grid container spacing={4}>
        <Grid size={4} bgcolor={'#fff'}>
          <SelectLeague />
        </Grid>
        <Grid size={2} bgcolor={'#fff'}>
          <SelectSeason />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Selects;
