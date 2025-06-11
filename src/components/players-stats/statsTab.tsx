import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import HeaderMain from '../common/Table/headerMain';
import HeaderSection from '../common/Table/headerSection';
import SelectSeason from '../common/Selects/selectSeason';
import HeaderPosition from '../common/Table/headerPosition';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import TableFlag from '../common/Images/tableFlag';
import { Fragment } from 'react';

const StatsTab = ({ tabHeader, players, goalies }: any) => {
  const leagues = [
    ...new Map(
      players.map((item: any) => [
        item.league_id,
        { league_id: item.league_id, short_name: item.short_name },
      ])
    ).values(),
  ];

  return (
    <TableContainer component={Paper}>
      <Table size='small'>
        <HeaderMain
          cells={[`${goalies ? 'Goalies' : 'Skaters'} in ${tabHeader}`]}
        />
      </Table>
      <Box m={2}>
        <SelectSeason />
      </Box>
      <Table size='small'>
        <HeaderSection
          cells={[
            { text: 'Player', width: '20%' },
            { text: 'Team', width: '20%' },
            { align: 'center', text: 'Born' },
            { align: 'center', text: 'Height' },
            { align: 'center', text: 'Weight' },
            { align: 'center', text: 'GP' },
            { align: 'center', text: 'G' },
            { text: 'Postseason', width: '15%' },
          ]}
        />
        {leagues
          .sort((a: any, b: any) => a.short_name.localeCompare(b.short_name))
          .map((league: any) => {
            const leaguePlayers = players.filter(
              (player: any) =>
                player.league_id === league.league_id &&
                (goalies
                  ? player.player_order === 1
                  : player.player_order !== 1)
            );

            if (leaguePlayers.length === 0) {
              return null;
            }

            return (
              <Fragment key={league.league_id}>
                <HeaderPosition
                  cells={[league.short_name, '', '', '', '', '', '', '']}
                />
                <TableBody>
                  {leaguePlayers.map((player: any) => (
                    <TableRow key={player.id}>
                      <TableCell>
                        <Link
                          underline='hover'
                          component={RouterLink}
                          to={`/players/${player.player_id}`}
                        >
                          {player.first_name} {player.last_name} (
                          {player.player_position})
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Box display='flex' alignItems='center'>
                          <TableFlag src={player.team_flag} />
                          <Link
                            underline='hover'
                            component={RouterLink}
                            to={`/teams/${player.team_id}`}
                            ml={1}
                          >
                            {player.full_name}
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell align='center'>{player.birth_year}</TableCell>
                      <TableCell align='center'>{player.height}</TableCell>
                      <TableCell align='center'>{player.weight}</TableCell>
                      <TableCell align='center'>{player.games}</TableCell>
                      <TableCell align='center'>{player.goals}</TableCell>
                      <TableCell>{player.postseason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Fragment>
            );
          })}
      </Table>
    </TableContainer>
  );
};

export default StatsTab;
