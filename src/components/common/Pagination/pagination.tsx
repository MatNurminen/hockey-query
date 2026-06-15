import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

interface PaginationProps {
  offset: number;
  limit: number;
  total: number;
  label?: string;
  onPageChange: (offset: number) => void;
}

const Pagination = ({
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
        px: 2,
        py: 1.5,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography variant="subtitle2">
          {total} {"label"}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Button
          size="small"
          variant="text"
          disabled={isFirst}
          onClick={() => onPageChange(0)}
        >
          First
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          size="small"
          variant="text"
          disabled={isFirst}
          onClick={() => onPageChange(offset - limit)}
        >
          Previous
        </Button>
        <Divider orientation="vertical" flexItem />
        <Typography variant="body2" sx={{ px: 1 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Divider orientation="vertical" flexItem />
        <Button
          size="small"
          variant="text"
          disabled={isLast}
          onClick={() => onPageChange(offset + limit)}
        >
          Next
        </Button>
        <Divider orientation="vertical" flexItem />
        <Button
          size="small"
          variant="text"
          disabled={isLast}
          onClick={() => onPageChange((totalPages - 1) * limit)}
        >
          Last
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;
