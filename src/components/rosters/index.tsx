import Container from '@mui/material/Container';
import SectionHeader from '../common/Sections/sectionHeader';
import Selects from './selects';
import Players from './players';

const Rosters = () => {
  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <SectionHeader txtAlign='left' content='Rosters' />
      <Selects />
      <Players />
    </Container>
  );
};

export default Rosters;
