import Container from '@mui/material/Container';
import ByNation from './byNation';
import ByTeam from './byTeam';
import SectionHeader from '../../common/Sections/sectionHeader';
import Paper from '@mui/material/Paper';

const Drafts = () => {
  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <SectionHeader txtAlign='left' content='NHL Entry Draft' />
      <Paper sx={{ mt: 2 }}>
        <ByNation />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <ByTeam />
      </Paper>
    </Container>
  );
};

export default Drafts;
