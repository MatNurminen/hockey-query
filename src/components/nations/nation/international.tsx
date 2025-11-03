import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import HeaderMain from '../../common/Table/headerMain';
import HeaderSection from '../../common/Table/headerSection';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import TableFlag from '../../common/Images/tableFlag';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { getTeamsForNation } from '../../../api/teams-stats/queries';
import Grid from '@mui/material/Grid2';

const International = ({ nation }: { nation: any }) => {
  const {
    data: wc,
    isLoading: wcLoading,
    isError: wcError,
  } = getTeamsForNation({
    nationId: nation.id,
    shortName: 'WC%',
    limit: 10,
  });
  const {
    data: u20,
    isLoading: u20Loading,
    isError: u20Error,
  } = getTeamsForNation({
    nationId: nation.id,
    shortName: 'U20%',
    limit: 10,
  });

  if (wcLoading || u20Loading) return <p>Загрузка...</p>;
  if (wcError || u20Error) return <p>Ошибка загрузки</p>;
  if (!wc || !u20) return <div>No data available</div>;

  const items: { id: number; name: string; data: any }[] = [
    { id: 1, name: nation.name, data: wc },
    { id: 2, name: nation.name + ' U20', data: u20 },
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table size='small'>
          <HeaderMain cells={['International Record']} />
        </Table>
        <Table size='small'>
          <HeaderSection
            cells={[
              { text: 'World Championship', width: '50%' },
              { text: 'U20 World Championship', width: '50%' },
            ]}
          />
        </Table>
      </TableContainer>
      <Grid container sx={{ py: 1 }}>
        {items.map((item: any) => (
          <Grid size={6} key={item.id}>
            {item.data?.length > 0 && (
              <List dense={true} disablePadding={true}>
                <ListItem sx={{ py: 0 }}>
                  <ListItemIcon sx={{ mr: -2 }}>
                    <TableFlag alt={nation.name} src={nation.flag} />
                  </ListItemIcon>

                  <Link
                    underline='hover'
                    component={RouterLink}
                    to={`/teams/${item.data[0].team_id}`}
                  >
                    <ListItemText primary={item.name} />
                  </Link>
                </ListItem>
                {item.data.map((team: any, key: any) => (
                  <ListItem key={key} sx={{ py: 0 }}>
                    <ListItemText
                      primary={
                        <>
                          <Link
                            underline='hover'
                            component={RouterLink}
                            to={`/rosters?league=${team.league_id}&season=${team.season_id}`}
                            style={{ marginRight: 4 }}
                          >
                            {team.season_id}
                          </Link>
                          {team.short_name} {team.postseason}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default International;
