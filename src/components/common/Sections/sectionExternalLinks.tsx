import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
import BarChartIcon from '@mui/icons-material/BarChart';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { memo } from 'react';

const IconButtonItem = styled(IconButton)(() => ({
  size: 'small',
  color: '#000',
  backgroundColor: '#eceef3',
  '&:hover': {
    backgroundColor: '#9db1bb',
  },
}));

const SectionExternalLinks = ({ title }: any) => {
  return (
    <>
      <Typography align={'center'} variant='body2'>
        {title} external links
      </Typography>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          my: 1,
        }}
      >
        <Tooltip title=''>
          <IconButtonItem>
            <LanguageIcon />
          </IconButtonItem>
        </Tooltip>
        <Tooltip title=''>
          <IconButtonItem>
            <BarChartIcon />
          </IconButtonItem>
        </Tooltip>
        <Tooltip title=''>
          <IconButtonItem>
            <YouTubeIcon />
          </IconButtonItem>
        </Tooltip>
      </Stack>
    </>
  );
};

export default memo(SectionExternalLinks);
