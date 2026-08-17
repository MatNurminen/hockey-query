import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type { CellValue } from "../types";

interface FooterSectionProps {
  cells: CellValue[];
}

const FooterSection = ({ cells }: FooterSectionProps) => {
  const normalizedCells = cells.map((cell) =>
    typeof cell === "string" ? { text: cell } : cell,
  );

  return (
    <TableFooter sx={{ backgroundColor: "secondary.main" }}>
      <TableRow>
        {normalizedCells.map((cell, index) => (
          <TableCell
            key={index}
            align={cell.align}
            width={cell.width}
            colSpan={cell.colSpan}
            sx={cell.sx}
          >
            <Box>
              <Typography
                variant="body2"
                sx={(theme) => ({ color: theme.palette.common.white })}
              >
                {cell.text}
              </Typography>
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableFooter>
  );
};

export default FooterSection;
