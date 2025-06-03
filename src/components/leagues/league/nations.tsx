import Box from '@mui/material/Box';
import SectionFirst from '../../common/Sections/sectionFirst';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TableFlag from '../../common/Images/tableFlag';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PiesChart from '../../common/Charts/pieChart';

import { useQuery } from '@apollo/client';
import { GET_COUNT_PLAYERS_BY_NATION } from '../../../queries/PlayersTournaments';

ChartJS.register(ArcElement, Tooltip, Legend);

const Nations = ({ leagueId, seasonId }: any) => {
  const { loading, error, data } = useQuery(GET_COUNT_PLAYERS_BY_NATION, {
    variables: { leagueId, seasonId },
  });

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading...</p>;

  let pie_data: any[] = data.playersCountByNation.map((nation: any) => {
    return nation.count;
  });

  let pie_color = data.playersCountByNation.map((nation: any) => {
    return nation.color;
  });

  const dataD: any = {
    datasets: [
      {
        data: pie_data,
        backgroundColor: pie_color,
        hoverBackgroundColor: pie_color,
      },
    ],
  };

  let data_num: any[] = data.playersCountByNation.map((nation: any) => {
    return { ...nation, value: Number(nation.count) };
  });

  return (
    <Box my={3}>
      <SectionFirst txtAlign='left' content='Player Nationalities' />
      <List
        sx={{ columns: { xs: 2, sm: 3, md: 4 } }}
        dense={true}
        disablePadding={true}
      >
        {data.playersCountByNation.map((nation: any, key: any) => (
          <ListItem key={key}>
            <ListItemIcon sx={{ mr: -2 }}>
              <TableFlag src={nation.flag} />
            </ListItemIcon>
            <Link underline='hover' component={RouterLink} to={'/'}>
              <ListItemText primary={nation.count + ' players'} />
            </Link>
          </ListItem>
        ))}
      </List>
      <Box width='40%'>
        <Doughnut data={dataD} />
        {/* <PiesChart data={data_num} /> */}
      </Box>
    </Box>
  );
};

export default Nations;
