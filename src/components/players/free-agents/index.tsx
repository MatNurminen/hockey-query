import { useSearchParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import SectionHeader from '../../common/Sections/sectionHeader';
import Selects from './selects';
import Players from './players';
import Paper from '@mui/material/Paper';

const FreeAgents = () => {
  const [searchParams] = useSearchParams();
  const seasonId = searchParams.get('season') || 2012;
  const nationId = searchParams.get('nation') || 1;

  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <SectionHeader txtAlign='left' content='Free Agents' />
      <Paper sx={{ mt: 2 }}>
        <Selects nationId={nationId} />
      </Paper>
      <Paper sx={{ mt: 2 }}>
        <Players seasonId={seasonId} nationId={nationId} />
      </Paper>
    </Container>
  );
};

export default FreeAgents;
