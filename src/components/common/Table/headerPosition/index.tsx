import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface HeaderPositionProps {
  cells: string[];
  align?: TableCellProps["align"];
}

const HeaderPosition = ({ cells, align }: HeaderPositionProps) => {
  return (
    <TableHead sx={{ backgroundColor: "#8abed2" }}>
      <TableRow>
        {cells.map((cell, key) => (
          <TableCell key={key} align={align}>
            <Box sx={{ textTransform: "uppercase" }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: "medium", color: "#fff" }}
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
