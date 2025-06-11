import Grid from '@mui/material/Grid2';
import SectionHeader from '../common/Sections/sectionHeader';
import SelectNation from '../common/Selects/selectNation';
import Box from '@mui/material/Box';

const Header = ({ nation }: any) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1} alignItems='center' mt={-2}>
        <Grid size={1}>
          <img alt='' width={60} src={nation.flag} />
        </Grid>
        <Grid size={8}>
          <SectionHeader txtAlign='left' content={nation.name + ' - Players'} />
        </Grid>
        <Grid size={3}>
          <SelectNation label='Change Nation' />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
