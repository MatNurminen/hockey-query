import React from 'react';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
//import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuDrawer from './MenuDrawer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LinkRoute from '../../common/LinkRoute';
import { TabsMain } from './styles';

const NavBar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('lg'));

  const lastSeason: number = 2024;

  const pages = [
    { label: 'Tournaments', to: '/tournaments' },
    { label: 'Teams', to: '/teams' },
    { label: 'Leagues', to: '/leagues' },
    { label: 'Nations', to: '/nations' },
    { label: 'Free Agents', to: `/free-agents?season=${lastSeason}&nation=1` },
    { label: 'Drafts', to: '/drafts' },
  ];

  return (
    <React.Fragment>
      <AppBar
        elevation={0}
        sx={{ backgroundColor: '#063950' }}
        position='static'
      >
        <Container sx={{ my: 2 }}>
          <Toolbar disableGutters>
            <LinkRoute
              to='/'
              sx={{
                display: 'block',
                width: '8%',
              }}
            >
              <img
                src='/img/logo.png'
                alt='Logo'
                loading='lazy'
                style={{
                  display: 'block',
                  width: '100%',
                }}
              />
            </LinkRoute>
            {isMatch ? (
              <MenuDrawer />
            ) : (
              <TabsMain value={false}>
                {pages.map((page, key) => (
                  <Tab
                    key={key}
                    sx={{ mx: 4, p: 0 }}
                    label={
                      <Typography component='div' color='#fff'>
                        <Box sx={{ fontWeight: 'bold' }}>{page.label}</Box>
                      </Typography>
                    }
                    to={page.to}
                    component={LinkRoute}
                  />
                ))}
              </TabsMain>
            )}
            <Button sx={{ ml: 'auto' }} variant='contained' color='success'>
              Sign In
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBar;
