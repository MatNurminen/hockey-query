import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SectionChapterProps {
  txtAlign: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  content: string;
}

const SectionChapter: React.FC<SectionChapterProps> = ({
  txtAlign,
  content,
}) => {
  return (
    <Box
      sx={{ my: 1, px: 2, py: 1, backgroundColor: '#093f56', color: '#fff' }}
    >
      <Typography component={'span'} align={txtAlign}>
        <Box sx={{ fontWeight: 'medium', textTransform: 'uppercase' }}>
          {content}
        </Box>
      </Typography>
    </Box>
  );
};

export default SectionChapter;
