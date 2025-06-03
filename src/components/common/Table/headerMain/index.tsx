import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const HeaderMain = ({ cells }: any) => {
  return (
    <TableHead sx={{ backgroundColor: '#093f56' }}>
      <TableRow>
        {cells.map((cell: any, key: any) => (
          <TableCell key={key}>
            <Box sx={{ textTransform: 'uppercase' }}>
              <Typography sx={{ fontWeight: 'medium', color: '#fff' }}>
                {cell}
              </Typography>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default HeaderMain;
