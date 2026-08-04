import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { CellValue } from "../types";

interface HeaderMainProps {
  cells: CellValue[];
}

const HeaderMain = ({ cells }: HeaderMainProps) => {
  const normalizedCells = cells.map((cell) =>
    typeof cell === "string" ? { text: cell } : cell,
  );

  return (
    <TableHead sx={{ backgroundColor: "#093f56" }}>
      <TableRow>
        {normalizedCells.map((cell, index) => (
          <TableCell
            key={index}
            align={cell.align}
            width={cell.width}
            colSpan={cell.colSpan}
          >
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

export default HeaderMain;
