import Box from '@mui/material/Box';
import { getLeaguesByNation } from '../../../api/leagues/queries';
import { memo } from 'react';
import SectionChapter from '../../common/Sections/sectionChapter';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import TableFlag from '../../common/Images/tableFlag';
//import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import ListItemText from '@mui/material/ListItemText';

const Leagues = ({ nationId }: any) => {
  const { data } = getLeaguesByNation(nationId);

  if (!data) return <h3>No data available</h3>;

  return (
    <Box my={2}>
      <SectionChapter txtAlign='left' content='Featured Leagues' />
      <List
        sx={{ columns: { sm: 2, md: 3, lg: 4 }, pb: 1 }}
        dense={true}
        disablePadding={true}
      >
        {data.map((league: any, key: any) => (
          <ListItem key={key}>
            <ListItemIcon sx={{ mr: -2 }}>
              <TableFlag src={league.flag} />
            </ListItemIcon>
            <Link
              underline='hover'
              //component={RouterLink}
              //to={'/leagues/' + league.id}
            >
              <ListItemText primary={league.short_name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(Leagues);
