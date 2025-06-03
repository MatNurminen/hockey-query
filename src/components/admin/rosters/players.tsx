import HeaderMain from '../../common/Table/headerMain';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import TableFlag from '../../common/Images/tableFlag';
import ClubHeader from './clubHeader';
import { getStandings } from '../../../api/teams-stats/queries';
import { getPlayersStatsDetail } from '../../../api/players-stats/queries';
import RedButton from '../../common/Buttons/redButton';
import { useDeletePlayerTournament } from '../../../api/players-tournaments/mutations';

const Players = () => {
  const [searchParams] = useSearchParams();
  const leagueId = [Number(searchParams.get('league'))];
  const seasonId = Number(searchParams.get('season'));

  const {
    data: teams = [],
    isError,
    isLoading,
  } = getStandings({ leagueId, seasonId });

  const { data: players } = getPlayersStatsDetail({ leagueId, seasonId });

  const { mutate: deletePlayerTournament } = useDeletePlayerTournament(
    leagueId[0],
    seasonId
  );

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;
  if (!teams) return <h3>No data available</h3>;
  if (!players) return <h3>No data available</h3>;

  const handleDelete = (id: number) => {
    deletePlayerTournament({ id });
  };

  return (
    <TableContainer component={Paper}>
      {teams
        .sort((a: any, b: any) => a.full_name.localeCompare(b.full_name))
        .map((team: any) => (
          <div key={team.id}>
            <ClubHeader
              teamTournamentId={team.id}
              leagueId={leagueId}
              seasonId={seasonId}
              team={team.full_name}
              logo={team.logo}
            />
            <Table size='small'>
              <HeaderMain
                align='center'
                cells={[
                  '#',
                  'Pos',
                  'Nat',
                  'Name',
                  'GP',
                  'G',
                  'Postseason',
                  'Age',
                  'Born',
                  'Height',
                  '',
                ]}
              />
              <TableBody>
                {players
                  .filter((player: any) => player.team_id === team.team_id)
                  .sort((b: any, a: any) => b.player_order - a.player_order)
                  .map((player: any, key: any) => (
                    <TableRow key={key}>
                      <TableCell>{player.jersey_number}</TableCell>
                      <TableCell>{player.player_position}</TableCell>
                      <TableCell>
                        <TableFlag src={player.player_flag} />
                      </TableCell>
                      <TableCell>
                        <Link
                          underline='hover'
                          component={RouterLink}
                          to={`/players/${player.player_id}`}
                        >
                          {player.first_name} {player.last_name}
                        </Link>
                      </TableCell>
                      <TableCell>{player.games}</TableCell>
                      <TableCell>{player.goals}</TableCell>
                      <TableCell>{player.postseason}</TableCell>
                      <TableCell>
                        {player.season_id - player.birth_year}
                      </TableCell>
                      <TableCell>{player.birth_year}</TableCell>
                      <TableCell>{player.height}</TableCell>
                      <TableCell>
                        <RedButton
                          text='Delete'
                          size='small'
                          onClick={() => {
                            handleDelete(Number(player.id));
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ))}
    </TableContainer>
  );
};

export default Players;
