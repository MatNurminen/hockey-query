import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SectionFirstProps {
  txtAlign: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  content: string;
}

const SectionFirst: React.FC<SectionFirstProps> = ({ txtAlign, content }) => {
  return (
    <Box my={3}>
      <Typography component={'span'} align={txtAlign} variant='body1'>
        <Box sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
          {content}
        </Box>
      </Typography>
    </Box>
  );
};

export default SectionFirst;
