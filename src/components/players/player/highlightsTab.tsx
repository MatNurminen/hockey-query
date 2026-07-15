import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import HeaderSection from "../../common/Table/headerSection";
import Table from "@mui/material/Table";
import { memo } from "react";
import type { Cell } from "../../common/Table/types";
import SectionChapter from "../../common/Sections/sectionChapter";

interface Props {
  playerName: string;
  headerCells: Cell[];
}

const HighlightsTab = ({ playerName, headerCells }: Props) => {
  return (
    <>
      <SectionChapter
        txtAlign={"left"}
        content={`${playerName} Career Highlights`}
      />
      <TableContainer component={Paper}>
        <Table size="small">
          <HeaderSection cells={headerCells} />
        </Table>
      </TableContainer>
    </>
  );
};

export default memo(HighlightsTab);
