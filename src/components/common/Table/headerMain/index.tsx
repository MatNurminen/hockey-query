import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface HeaderMainProps {
  cells: string[];
}

const HeaderMain = ({ cells }: HeaderMainProps) => {
  return (
    <TableHead sx={{ backgroundColor: "#093f56" }}>
      <TableRow>
        {cells.map((cell, key) => (
          <TableCell key={key}>
            <Box sx={{ textTransform: "uppercase" }}>
              <Typography sx={{ fontWeight: "medium", color: "#fff" }}>
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
