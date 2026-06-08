import Box from '@mui/material/Box';
import SectionChapter from '../../common/Sections/sectionChapter';

interface Props {
  title: string
}

const Champions = ({ title }: Props) => {
  return (
    <Box my={2}>
      <SectionChapter
        txtAlign='left'
        content={'List of ' + title + ' Champions'}
      />
    </Box>
  );
};

export default Champions;
