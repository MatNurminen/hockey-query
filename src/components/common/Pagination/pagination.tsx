import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Props {
  offset: number;
  limit: number;
  total: number;
  onPageChange: (offset: number) => void;
}

const Pagination = ({ offset, limit, total, onPageChange }: Props) => {
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
        <Typography variant="subtitle2">{total} players</Typography>
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
        <Typography color="text.secondary">|</Typography>
        <Button
          size="small"
          variant="text"
          disabled={isFirst}
          onClick={() => onPageChange(offset - limit)}
        >
          Previous
        </Button>
        <Typography color="text.secondary">|</Typography>
        <Typography variant="body2" sx={{ px: 1 }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Typography color="text.secondary">|</Typography>
        <Button
          size="small"
          variant="text"
          disabled={isLast}
          onClick={() => onPageChange(offset + limit)}
        >
          Next
        </Button>
        <Typography color="text.secondary">|</Typography>
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
