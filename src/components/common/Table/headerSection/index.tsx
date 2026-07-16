import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Cell } from "../types";

interface HeaderSectionProps {
  cells: Cell[];
}

const HeaderSection = ({ cells }: HeaderSectionProps) => {
  return (
    <TableHead sx={{ backgroundColor: "#ca3136" }}>
      <TableRow>
        {cells.map((cell, key) => (
          <TableCell key={key} align={cell.align} width={cell.width} colSpan={cell.colSpan}>
            <Box sx={{ textTransform: "uppercase" }}>
              <Typography sx={{ fontWeight: "medium", color: "#fff" }}>
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
