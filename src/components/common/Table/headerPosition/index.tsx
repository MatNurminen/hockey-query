import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface HeaderPositionProps {
  cells: string[];
  align?: TableCellProps["align"];
  row?: boolean;
  colSpan?: number;
}

const HeaderPosition = ({
  cells,
  align,
  row = false,
  colSpan,
}: HeaderPositionProps) => {
  const tableRow = (
    <TableRow
      sx={(theme) => ({
        backgroundColor: theme.palette.extra.headerPositionBG,
        "&:nth-of-type(even)": {
          backgroundColor: theme.palette.extra.headerPositionBG,
        },
      })}
    >
      {cells.map((cell, key) => (
        <TableCell
          key={key}
          component="th"
          scope="col"
          align={align}
          colSpan={key === 0 ? colSpan : undefined}
        >
          <Box sx={{ textTransform: "uppercase" }}>
            <Typography
              variant="body2"
              sx={(theme) => ({
                fontWeight: "medium",
                color: theme.palette.common.white,
              })}
            >
              {cell}
            </Typography>
          </Box>
        </TableCell>
      ))}
    </TableRow>
  );

  return row ? tableRow : <TableHead>{tableRow}</TableHead>;
};

export default HeaderPosition;
