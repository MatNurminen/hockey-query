import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";

const StyledTableRow = styled(TableRow)({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ecf1f3",
  },
});

export default StyledTableRow;
