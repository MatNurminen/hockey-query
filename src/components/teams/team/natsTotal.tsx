import Box from '@mui/material/Box';
import SectionChapter from '../../common/Sections/sectionChapter';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TableFlag from '../../common/Images/tableFlag';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { memo } from 'react';
import { getCountPlayersByNation } from '../../../api/players-stats/queries';

const NatsTotal = ({ teamId }: any) => {
  const { data, isLoading, isError } = getCountPlayersByNation({
    teamId,
    typeId: 1,
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!data) return <h3>No data available</h3>;

  return (
    <Box my={2}>
      <SectionChapter
        txtAlign='left'
        content='Nationalities Throughout History'
      />
      <List
        sx={{ columns: { sm: 2, md: 3, lg: 4 }, pb: 1 }}
        dense={true}
        disablePadding={true}
      >
        {data.map((nat: any) => (
          <ListItem key={nat.id}>
            <ListItemIcon sx={{ mr: -2 }}>
              <TableFlag src={nat.flag} />
            </ListItemIcon>
            <Link
              underline='hover'
              component={RouterLink}
              to={'/teams/' + nat.id}
            >
              <ListItemText
                primary={`${nat.count} ${
                  nat.count == 1 ? 'player' : 'players'
                }`}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default memo(NatsTotal);
