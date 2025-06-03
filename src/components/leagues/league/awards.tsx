import Box from '@mui/material/Box';
import SectionChapter from '../../common/Sections/sectionChapter';

const Awards = ({ leagueId, title }: any) => {
  return (
    <Box my={3}>
      <SectionChapter txtAlign='left' content={title + ' awards'} />
    </Box>
  );
};

export default Awards;
