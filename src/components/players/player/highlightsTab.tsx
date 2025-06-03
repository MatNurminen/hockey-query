import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import Table from '@mui/material/Table';

const HighlightsTab = ({ playerName, playerId, headerCells }: any) => {
  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <HeaderMain cells={[`${playerName} Career Highlights`]} />
      </Table>
      <Table size='small'>
        <HeaderSection cells={headerCells} />
      </Table>
    </TableContainer>
  );
};

export default HighlightsTab;
