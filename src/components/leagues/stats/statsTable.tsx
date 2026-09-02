import { memo, type ReactNode } from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import HeaderSection from "../../common/Table/headerSection";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableFlag from "../../common/Images/tableFlag";
import LinkRoute from "../../common/LinkRoute";
import SectionChapter from "../../common/Sections/sectionChapter";
import type { TableCellProps } from "@mui/material/TableCell";

export interface StatsRow {
  player_id: number;
  first_name: string;
  last_name: string;
  player_position: string;
  player_flag: string;
}

export interface StatsColumn<TRow extends StatsRow> {
  align?: TableCellProps["align"];
  text: string;
  sx?: TableCellProps["sx"];
  render: (row: TRow, index: number) => ReactNode;
}

interface StatsTableProps<TRow extends StatsRow> {
  title: string;
  rows: TRow[];
  columns: StatsColumn<TRow>[];
  rowKey: (row: TRow, index: number) => string;
  offset: number;
}

const StatsTable = memo(
  function StatsTable<TRow extends StatsRow>({
    title,
    rows,
    columns,
    rowKey,
    offset,
  }: StatsTableProps<TRow>) {
    return (
      <Paper>
        <SectionChapter content={title} />
        <TableContainer>
          <Table size="small">
            <HeaderSection
              cells={[
                { align: "center", text: "#" },
                { text: "player" },
                ...columns.map(({ align, text }) => ({ align, text })),
              ]}
            />
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={rowKey(row, index)}>
                  <TableCell align="center">{offset + index + 1}</TableCell>
                  <TableCell sx={{ minWidth: 160 }}>
                    <Box display="flex" alignItems="center">
                      <TableFlag alt="" src={row.player_flag} />
                      <LinkRoute to={`/players/${row.player_id}`} ml={1}>
                        {row.first_name} {row.last_name} (
                        {row.player_position})
                      </LinkRoute>
                    </Box>
                  </TableCell>
                  {columns.map((column, columnIndex) => (
                    <TableCell
                      key={columnIndex}
                      align={column.align}
                      sx={column.sx}
                    >
                      {column.render(row, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  },
) as <TRow extends StatsRow>(props: StatsTableProps<TRow>) => ReactNode;

export default StatsTable;