import Box from '@mui/material/Box';
import SectionChapter from '../../common/Sections/sectionChapter';

const Champions = ({ leagueId, title }: any) => {
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
