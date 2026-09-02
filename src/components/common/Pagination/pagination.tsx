import { memo } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
  label?: string;
  onPageChange: (offset: number) => void;
}

const Pagination = memo(
  ({
    offset,
    limit,
    total,
    label = "players",
    onPageChange,
  }: PaginationProps) => {
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);
    const isFirst = offset === 0;
    const isLast = offset + limit >= total;

    if (total === 0) return null;

    return (
      <Stack
        direction="row"
        flexWrap="wrap"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
        pt={1.5}
        sx={{
          justifyContent: { xs: "center", sm: "flex-end" },
          alignItems: "center",
          "& > *:not(.MuiDivider-root)": {
            width: { xs: "26%", sm: "auto" },
          },
          "& > .MuiDivider-root": {
            display: { xs: "none", sm: "flex" },
          },
        }}
      >
        <Typography variant="subtitle2" pl={1}>
          {total} {label}
        </Typography>
        <Button
          size="small"
          variant="text"
          disabled={isFirst}
          onClick={() => onPageChange(0)}
        >
          First
        </Button>
        <Button
          size="small"
          variant="text"
          disabled={isFirst}
          onClick={() => onPageChange(offset - limit)}
        >
          Previous
        </Button>
        <Typography variant="body2">
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          size="small"
          variant="text"
          disabled={isLast}
          onClick={() => onPageChange(offset + limit)}
        >
          Next
        </Button>
        <Button
          size="small"
          variant="text"
          disabled={isLast}
          onClick={() => onPageChange((totalPages - 1) * limit)}
        >
          Last
        </Button>
      </Stack>
    );
  },
);

export default Pagination;
