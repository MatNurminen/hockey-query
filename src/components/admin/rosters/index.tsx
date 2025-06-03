import Container from '@mui/material/Container';
import SectionHeader from '../../common/Sections/sectionHeader';
import Players from './players';
import Selects from './selects';

const AdmRosters = () => {
  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <SectionHeader txtAlign='left' content='Admin Rosters' />
      <Selects />
      <Players />
    </Container>
  );
};

export default AdmRosters;
