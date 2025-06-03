import Container from '@mui/material/Container';
import Header from './header';
import NationsTable from './nationsTable';

const Nations = () => {
  return (
    <Container sx={{ py: 1, mb: 10 }}>
      <Header />
      <NationsTable />
    </Container>
  );
};

export default Nations;
