import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TableFlag from '../../common/Images/tableFlag';
import SectionChapter from '../../common/Sections/sectionChapter';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { getDraftTeams } from '../../../api/players/queries';

const ByTeam = () => {
  const { data: drafts, isError, isLoading } = getDraftTeams();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!drafts) return <h3>No data available</h3>;

  return (
    <>
      <SectionChapter txtAlign='left' content='Draft selections by team' />
      <List sx={{ columns: { xs: 2, sm: 3 } }} dense={true}>
        {drafts.map((draft: any, key: any) => (
          <ListItem key={key}>
            <ListItemAvatar>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <TableFlag src={draft.logo} />
              </Box>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link
                  underline='hover'
                  component={RouterLink}
                  to={`/drafts/dets?team=${draft.id}`}
                >
                  {draft.full_name} {draft.plrs} plrs
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ByTeam;
