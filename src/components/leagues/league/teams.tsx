import Box from '@mui/material/Box';
import SectionChapter from '../../common/Sections/sectionChapter';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TableFlag from '../../common/Images/tableFlag';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

import { getTeamsByLeague } from '../../../api/teams/queries';
import { memo } from 'react';

const Teams = ({ leagueId, title }: any) => {
  const { data } = getTeamsByLeague(leagueId);

  if (!data) return <h3>No data available</h3>;

  return (
    <Box my={2}>
      <SectionChapter txtAlign='left' content={title + ' teams list'} />
      <List
        sx={{ columns: { sm: 2, md: 3, lg: 4 }, pb: 1 }}
        dense={true}
        disablePadding={true}
      >
        {data.map((team: any, key: any) => (
          <ListItem key={key}>
            <ListItemIcon sx={{ mr: -2 }}>
              <TableFlag src={team.flag} />
            </ListItemIcon>
            <Link
              underline='hover'
              component={RouterLink}
              to={'/teams/' + team.id}
            >
              <ListItemText primary={team.full_name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(Teams);
