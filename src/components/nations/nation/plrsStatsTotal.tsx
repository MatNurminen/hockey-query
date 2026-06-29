import { memo } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import TableFlag from '../../common/Images/tableFlag';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import AppButton from '../../common/Buttons/appButton';
import Grid from '@mui/material/Grid2';
import {
  useMultiplePlayersStatsTotal,
  type MultipleStatsConfig,
} from '../../../api/players-stats/hooks';
import type { PlayersStatsTotalParams } from '../../../api/players-stats/types';
import { TPlayerStatTotal } from '../../../api/players-stats/types';

interface Props {
  nationId: number;
}

const PlrsStatsTotal = ({ nationId }: Props) => {
  const configs: MultipleStatsConfig<PlayersStatsTotalParams>[] = [
    {
      id: 1,
      name: 'NHL All-Time Points',
      params: {
        nationId,
        leagueId: 14,
        playerOrd: [2, 3],
        limit: 10,
      },
    },
    {
      id: 2,
      name: 'World Championships All-Time Points',
      params: {
        nationId,
        leagueId: 23,
        playerOrd: [2, 3],
        limit: 10,
      },
    },
  ];

  const {
    data: items,
    isLoading,
    isError,
  } = useMultiplePlayersStatsTotal(configs);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <h3>Error!</h3>;

  return (
      <Grid container spacing={3}>
        {items.map((item: { id: number; name: string; list: TPlayerStatTotal[] }) => (
          <Grid key={item.id} size={{ xs: 12, md: 6 }}>
            <TableContainer component={Paper}>
              <Table size='small'>
                <HeaderMain cells={[item.name]} />
              </Table>
              <Table size='small'>
                <HeaderSection
                  cells={[
                    { align: 'center', text: '#' },
                    { text: 'Player' },
                    { align: 'center', text: 'gp' },
                    { align: 'center', text: 'g' },
                  ]}
                />
                <TableBody>
                  {item.list.map((player: TPlayerStatTotal, index: number) => (
                    <TableRow key={player.player_id}>
                      <TableCell align='center'>{index + 1}</TableCell>
                      <TableCell>
                        <Box display='flex' alignItems='center'>
                          <TableFlag alt='' src={player.player_flag} />
                          <Link
                            underline='hover'
                            component={RouterLink}
                            to={`/players/${player.player_id}`}
                            ml={1}
                          >
                            {player.first_name} {player.last_name} (
                            {player.player_position})
                          </Link>
                        </Box>
                      </TableCell>
                      <TableCell align='center'>{player.games_t}</TableCell>
                      <TableCell align='center'>{player.goals_t}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
              <AppButton color='success' fullWidth={true} text='SHOW MORE' to={`/nation?nation=${nationId}`} />
          </Grid>
        ))}
      </Grid>
  );
};

export default memo(PlrsStatsTotal);
