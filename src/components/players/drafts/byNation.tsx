import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SectionChapter from '../../common/Sections/sectionChapter';
import TableFlag from '../../common/Images/tableFlag';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { getDraftNations } from '../../../api/players/queries';

const ByNation = () => {
  const { data: drafts, isError, isLoading } = getDraftNations();

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!drafts) return <h3>No data available</h3>;

  return (
    <>
      <SectionChapter txtAlign='left' content='Draft selections by nation' />
      <List sx={{ columns: { xs: 2, sm: 3, md: 4 } }} dense={true}>
        {drafts.map((draft: any, key: any) => (
          <ListItem key={key}>
            <ListItemAvatar sx={{ mr: -2 }}>
              <TableFlag src={draft.flag} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Link
                  underline='hover'
                  component={RouterLink}
                  to={`/drafts/dets?nation=${draft.id}`}
                >
                  {draft.name} {draft.plrs} plrs
                </Link>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ByNation;
