import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const HeaderSection = ({ cells }: any) => {
  return (
    <TableHead sx={{ backgroundColor: '#ca3136' }}>
      <TableRow>
        {cells.map((cell: any, key: any) => (
          <TableCell key={key} align={cell.align} width={cell.width}>
            <Box sx={{ textTransform: 'uppercase' }}>
              <Typography sx={{ fontWeight: 'medium', color: '#fff' }}>
                {cell.text}
              </Typography>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default HeaderSection;
