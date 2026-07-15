import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Link as RouterLink } from "react-router-dom";
import type { ReactNode } from "react";
import AppButton from "../../common/Buttons/appButton";
import HeaderSection from "../../common/Table/headerSection";
import TableFlag from "../../common/Images/tableFlag";
import SectionChapter from "../../common/Sections/sectionChapter";

export type WithPlayerInfo = {
  player_id: number;
  player_flag: string;
  first_name: string;
  last_name: string;
  player_position: string;
};

export interface ColumnDef<T extends WithPlayerInfo> {
  label: string;
  align?: "center" | "left" | "right";
  renderCell: (player: T) => ReactNode;
}

export interface PlayersStatsTableProps<T extends WithPlayerInfo> {
  items: {
    id: number;
    name: string;
    list: T[];
  }[];
  getHeaderText: (item: { id: number; name: string }) => string;
  columns: ColumnDef<T>[];
  getShowMorePath: (item: { id: number; name: string }) => string;
  gridSize: { sm: number; md: number };
  gridDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  gridJustifyContent?: string;
  gridAlignItems?: string;
}

const PlayersStatsTable = <T extends WithPlayerInfo>({
  items,
  getHeaderText,
  columns,
  getShowMorePath,
  gridSize,
  gridDirection,
  gridJustifyContent,
  gridAlignItems,
}: PlayersStatsTableProps<T>) => {
  return (
    <Grid
      container
      spacing={2}
      direction={gridDirection}
      justifyContent={gridJustifyContent}
      alignItems={gridAlignItems}
    >
      {items.map((item) => (
        <Grid size={gridSize} key={item.id}>
          <SectionChapter content={getHeaderText(item)} txtAlign={"right"} />
          <TableContainer component={Paper}>
            <Table size="small">
              <HeaderSection
                cells={[
                  { align: "center", text: "#" },
                  { text: "Player" },
                  ...columns.map((col) => ({
                    align: col.align,
                    text: col.label,
                  })),
                ]}
              />
              <TableBody>
                {item.list.map((player, index) => (
                  <TableRow key={`${player.player_id}-${index}`}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <TableFlag alt="" src={player.player_flag} />
                        <Link
                          underline="hover"
                          component={RouterLink}
                          to={`/players/${player.player_id}`}
                          ml={1}
                        >
                          {player.first_name} {player.last_name} (
                          {player.player_position})
                        </Link>
                      </Box>
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.label} align={col.align}>
                        {col.renderCell(player)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <AppButton
            color="success"
            fullWidth={true}
            text="Show More"
            to={getShowMorePath(item)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PlayersStatsTable;
