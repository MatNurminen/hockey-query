import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuTabs from './MenuTabs';

const AdminNavbar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <>
      {isMatch ? null : (
        <AppBar
          elevation={0}
          sx={{ backgroundColor: '#042e41' }}
          position='static'
        >
          <Container>
            <Tabs value={false}>
              <MenuTabs />
            </Tabs>
          </Container>
        </AppBar>
      )}
    </>
  );
};

export default AdminNavbar;
