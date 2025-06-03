import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import CardMedia from '@mui/material/CardMedia';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const MainCard = ({ player, lastTeam }: any) => {
  return (
    <Card sx={{ border: 'none', boxShadow: 'none' }}>
      <CardContent sx={{ backgroundColor: '#093f56' }}>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='center'
          spacing={3}
        >
          <img alt='' width={60} src={player.nation.flag} />
          <Typography color='#fff' variant='h4'>
            {`# ${player.jersey_number} ${player.first_name} ${player.last_name}`}
          </Typography>
        </Stack>
        <Box mt={2}>
          {lastTeam ? (
            <Box sx={{ color: '#fff' }}>
              <Typography gutterBottom variant='body1'>
                {lastTeam.name} {' - '}
                <Link
                  underline='hover'
                  component={RouterLink}
                  to={`/teams/${lastTeam.team_id}`}
                  color={'common.white'}
                >
                  {lastTeam.full_name}
                </Link>{' '}
                {' / '}
                <Link
                  underline='hover'
                  component={RouterLink}
                  to={`/leagues/${lastTeam.league_id}`}
                  color={'common.white'}
                >
                  {lastTeam.short_name}
                </Link>
              </Typography>
            </Box>
          ) : null}
        </Box>
      </CardContent>
      <CardMedia>
        <Box mt={4} textAlign='center'>
          <img height={120} alt='' src={player.nation.logo} />
        </Box>
      </CardMedia>
    </Card>
  );
};

export default MainCard;
