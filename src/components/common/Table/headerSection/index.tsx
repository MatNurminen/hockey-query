import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { CellValue } from "../types";

interface HeaderSectionProps {
  cells: CellValue[];
  row?: boolean;
}

const HeaderSection = ({ cells, row = false }: HeaderSectionProps) => {
  const normalizedCells = cells.map((cell) =>
    typeof cell === "string" ? { text: cell } : cell,
  );

  const tableRow = (
    <TableRow>
      {normalizedCells.map((cell, index) => (
        <TableCell
          key={index}
          align={cell.align}
          width={cell.width}
          colSpan={cell.colSpan}
          sx={{ backgroundColor: "secondary.main" }}
        >
          <Box sx={{ textTransform: "uppercase" }}>
            <Typography
              sx={(theme) => ({
                fontWeight: "medium",
                color: theme.palette.common.white,
              })}
            >
              {cell.text}
            </Typography>
          </Box>
        </TableCell>
      ))}
    </TableRow>
  );

  return row ? tableRow : <TableHead>{tableRow}</TableHead>;
};

export default HeaderSection;
