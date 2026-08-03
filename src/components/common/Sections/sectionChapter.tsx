import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SectionTextAlign } from "./sectionTypes";

interface Props {
  txtAlign?: SectionTextAlign;
  content: string;
}

const SectionChapter = ({ txtAlign = "left", content }: Props) => {
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        backgroundColor: "ocean.main",
        color: "ocean.contrastText",
      }}
    >
      <Typography
        sx={{ fontWeight: "medium", textTransform: "uppercase" }}
        align={txtAlign}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default SectionChapter;
