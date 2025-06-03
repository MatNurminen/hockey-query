import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SectionHeaderProps {
  txtAlign: 'center' | 'inherit' | 'justify' | 'left' | 'right';
  content: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ txtAlign, content }) => {
  return (
    <Box my={3}>
      <Typography
        color='#063950'
        component={'span'}
        align={txtAlign}
        variant='h5'
      >
        <Box sx={{ fontWeight: 'bold', letterSpacing: 1 }}>{content}</Box>
      </Typography>
    </Box>
  );
};

export default SectionHeader;
