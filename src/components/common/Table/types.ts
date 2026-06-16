import type { TableCellProps } from "@mui/material/TableCell";

export interface Cell {
  align?: TableCellProps["align"];
  width?: string | number;
  text: string;
}
