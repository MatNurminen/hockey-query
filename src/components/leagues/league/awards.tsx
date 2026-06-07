import Box from '@mui/material/Box';
import SectionChapter from '../../common/Sections/sectionChapter';

interface Props {
  title: string
}

const Awards = ({ title }: Props) => {
  return (
    <Box my={3}>
      <SectionChapter txtAlign='left' content={title + ' awards'} />
    </Box>
  );
};

export default Awards;
