import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SectionTextAlign } from "./sectionTypes";

interface Props {
  txtAlign: SectionTextAlign;
  content: string;
}

const SectionFirst = ({ txtAlign, content }: Props) => {
  return (
    <Box my={3}>
      <Typography
        align={txtAlign}
        variant="body1"
        sx={{ fontWeight: "bold", textTransform: "uppercase" }}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default SectionFirst;
