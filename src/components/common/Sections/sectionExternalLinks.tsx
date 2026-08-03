import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LanguageIcon from "@mui/icons-material/Language";
import BarChartIcon from "@mui/icons-material/BarChart";
import YouTubeIcon from "@mui/icons-material/YouTube";

interface Props {
  title: string;
}

const IconButtonItem = styled(IconButton)(() => ({
  color: "#000",
  backgroundColor: "#eceef3",
  "&:hover": {
    backgroundColor: "#9db1bb",
  },
}));

const SectionExternalLinks = ({ title }: Props) => {
  return (
    <>
      <Typography align={"center"} variant="body2">
        {title} external links
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          my: 1,
        }}
      >
        <Tooltip title="">
          <IconButtonItem size="small">
            <LanguageIcon />
          </IconButtonItem>
        </Tooltip>
        <Tooltip title="">
          <IconButtonItem size="small">
            <BarChartIcon />
          </IconButtonItem>
        </Tooltip>
        <Tooltip title="">
          <IconButtonItem size="small">
            <YouTubeIcon />
          </IconButtonItem>
        </Tooltip>
      </Stack>
    </>
  );
};

export default SectionExternalLinks;
