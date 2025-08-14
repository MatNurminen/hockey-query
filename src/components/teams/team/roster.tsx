import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import HeaderPosition from '../../common/Table/headerPosition';
import { getPlayersStatsDetail } from '../../../api/players-stats/queries';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableFlag from '../../common/Images/tableFlag';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import FooterSection from '../../common/Table/footerSection';

const Roster = ({ teamId, seasonId, title }: any) => {
  const {
    data: players,
    isLoading,
    isError,
  } = getPlayersStatsDetail({
    teamId,
    seasonId,
    typeId: 1,
    //leagueId: [23],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!players) return <div>No data available</div>;

  const pos = ['GOALTENDERS', 'DEFENSEMEN', 'FORWARDS'];

  const players_by_pos = (_player: any, pos: any) => {
    return players.filter((pl: any) => pl.player_order === pos);
  };

  const goaltenders = players_by_pos(players, 1);
  const defensemen = players_by_pos(players, 2);
  const forwards = players_by_pos(players, 3);

  const calcAverage = (players: any) => {
    const totalPlayers = players.length;
    const totalAge = players.reduce(
      (sum: any, player: any) => sum + (player.season_id - player.birth_year),
      0
    );
    const totalHeight = players.reduce(
      (sum: any, player: any) => sum + player.height,
      0
    );
    const totalWeight = players.reduce(
      (sum: any, player: any) => sum + player.weight,
      0
    );

    const averageAge = totalAge / totalPlayers;
    const averageHeight = totalHeight / totalPlayers;
    const averageWeight = totalWeight / totalPlayers;

    return {
      averageAge,
      averageHeight,
      averageWeight,
    };
  };

  const { averageAge, averageHeight, averageWeight } = calcAverage(players);

  return (
    <TableContainer>
      <Table size='small'>
        <HeaderMain
          cells={[`${seasonId}-${seasonId - 1999} ${title} Roster`]}
        />
      </Table>
      <Table size='small'>
        <HeaderSection
          cells={[
            { align: 'center', text: '#', width: '8%' },
            { align: 'center', text: 'N', width: '8%' },
            { text: 'player', width: '20%' },
            { align: 'center', text: 'gp', width: '8%' },
            { align: 'center', text: 'g', width: '8%' },
            { text: 'Postseason', width: '16%' },
            { align: 'center', text: 'a', width: '8%' },
            { align: 'center', text: 'born', width: '8%' },
            { align: 'center', text: 'ht', width: '8%' },
            { align: 'center', text: 'wt', width: '8%' },
          ]}
        />
      </Table>
      {pos.map((p, p_key) => (
        <TableContainer key={p_key}>
          <Table size='small'>
            <HeaderPosition cells={[`${p}`]} />
          </Table>
          <Table size='small'>
            <TableBody>
              {players_by_pos(players, p_key + 1).map(
                (player: any, key: any) => (
                  <TableRow key={key}>
                    <TableCell align='center' width={'8%'}>
                      {player.jersey_number}
                    </TableCell>
                    <TableCell align='center' width={'8%'}>
                      <TableFlag src={player.player_flag} />
                    </TableCell>
                    <TableCell width={'20%'}>
                      <Link
                        underline='hover'
                        component={RouterLink}
                        to={`/players/${player.player_id}`}
                      >
                        {player.first_name} {player.last_name} (
                        {player.player_position})
                      </Link>
                    </TableCell>
                    <TableCell align='center' width={'8%'}>
                      {player.games}
                    </TableCell>
                    <TableCell align='center' width={'8%'}>
                      {player.goals}
                    </TableCell>
                    <TableCell width={'16%'}>{player.postseason}</TableCell>
                    <TableCell align='center' width={'8%'}>
                      {player.season_id - player.birth_year}
                    </TableCell>
                    <TableCell align='center' width={'8%'}>
                      {player.birth_year}
                    </TableCell>
                    <TableCell align='center' width={'8%'}>
                      {player.height}
                    </TableCell>
                    <TableCell align='center' width={'8%'}>
                      {player.weight}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
      <Table size='small'>
        <FooterSection
          cells={[
            {
              align: 'center',
              text: `Position: G: ${goaltenders.length}, D: ${
                defensemen.length
              }, F: ${forwards.length} | 
              Av Age: ${averageAge.toFixed(2)} years | 
              Av Ht: ${averageHeight.toFixed(2)} cm | 
              Av Wt: ${averageWeight.toFixed(2)} kg | 
              Compare with other teams >> `,
            },
          ]}
        />
      </Table>
    </TableContainer>
  );
};

export default Roster;
