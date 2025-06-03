import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SectionHeader from '../../common/Sections/sectionHeader';
import LinkRoute from '../../common/LinkRoute';
import Box from '@mui/material/Box';
import { getLeaguesCurLogo } from '../../../api/leagues/queries';

const Leagues = ({ curSeason }: { curSeason: number }) => {
  const { data } = getLeaguesCurLogo();

  if (!data) return <h3>No data available</h3>;

  return (
    <>
      <SectionHeader
        txtAlign='center'
        content={`Leagues Rosters ${curSeason}-${curSeason - 1999}`}
      />
      <List>
        <Divider />
        {data.map((league: any, key: number) => (
          <Box
            component={LinkRoute}
            to={`/rosters?league=${league.id}&season=${curSeason}`}
            key={key}
          >
            <ListItem sx={{ my: 1 }}>
              <ListItemAvatar sx={{ mr: 2 }}>
                <Avatar
                  alt=''
                  sx={{ width: 56, height: 56 }}
                  src={league.logos.at(-1)?.logo}
                />
              </ListItemAvatar>
              <h4>{league.logos.logo}</h4>
              <ListItemText primary={<Typography>{league.name}</Typography>} />
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>
    </>
  );
};

export default Leagues;
