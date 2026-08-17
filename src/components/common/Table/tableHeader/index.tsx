import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { CellValue } from "../types";

export type TableHeaderBackground = "ocean.main" | "secondary.main";

interface TableHeaderProps {
  cells: CellValue[];
  background: TableHeaderBackground;
  row?: boolean;
}

const TableHeader = ({ cells, background, row = false }: TableHeaderProps) => {
  const normalizedCells = cells.map((cell) =>
    typeof cell === "string" ? { text: cell } : cell,
  );

  const tableRow = (
    <TableRow>
      {normalizedCells.map((cell, index) => (
        <TableCell
          key={index}
          component="th"
          scope={cell.colSpan && cell.colSpan > 1 ? "colgroup" : "col"}
          align={cell.align}
          width={cell.width}
          colSpan={cell.colSpan}
          sx={{
            backgroundColor: background,
            ...(cell.sx && typeof cell.sx === "object" && !Array.isArray(cell.sx)
              ? cell.sx
              : undefined),
          }}
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

export default TableHeader;
