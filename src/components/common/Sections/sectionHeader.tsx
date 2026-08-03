import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SectionTextAlign } from "./sectionTypes";

interface Props {
  txtAlign: SectionTextAlign;
  content: string;
}

const SectionHeader = ({ txtAlign, content }: Props) => {
  return (
    <Box my={3}>
      <Typography
        color="extra.menuBG"
        align={txtAlign}
        variant="h4"
        sx={{ fontWeight: "bold", letterSpacing: 1 }}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default SectionHeader;
