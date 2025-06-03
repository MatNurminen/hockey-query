import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const HeaderPosition = ({ cells, align }: any) => {
  return (
    <TableHead sx={{ backgroundColor: '#8abed2' }}>
      <TableRow>
        {cells.map((cell: any, key: any) => (
          <TableCell key={key} align={align}>
            <Box sx={{ textTransform: 'uppercase' }}>
              <Typography
                variant='body2'
                sx={{ fontWeight: 'medium', color: '#fff' }}
              >
                {cell}
              </Typography>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default HeaderPosition;
