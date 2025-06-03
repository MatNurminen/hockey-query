import { Suspense } from 'react';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import theme from './components/ui/Theme';
import Main from './components/main';
import NotFound from './components/notFound';
import Navbar from './components/layout/Navbar';
import AdminNavbar from './components/layout/AdminNavbar';
import Leagues from './components/leagues/leagues';
import League from './components/leagues/league';
import Nations from './components/nations/nations';
import Teams from './components/teams/teams';
import Loading from './components/layout/React-query/loading';

import queryClient from './api/queryClient';
import Nation from './components/nations/nation';
import Team from './components/teams/team';
import FreeAgents from './components/players/free-agents';
import Drafts from './components/players/drafts';
import DraftDetails from './components/players/drafts/draftDetails';
import Player from './components/players/player';
import SearchBar from './components/layout/SearchBar';
import Tournaments from './components/tournaments';
import Tournament from './components/admin/tournaments/updateTournament';
import Rosters from './components/rosters';
import AdmRosters from './components/admin/rosters';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <AdminNavbar />
        <SearchBar />
        <Loading />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/leagues' element={<Leagues />} />
            <Route path='/leagues/:id' element={<League />} />
            <Route path='/nations' element={<Nations />} />
            <Route path='/nations/:id' element={<Nation />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/teams/:id' element={<Team />} />
            <Route path='/players/:id' element={<Player />} />
            <Route path='/free-agents' element={<FreeAgents />} />
            <Route path='/drafts' element={<Drafts />} />
            <Route path='/drafts/dets' element={<DraftDetails />} />
            <Route path='/tournaments' element={<Tournaments />} />
            <Route path='/tournaments/:id' element={<Tournament />} />
            <Route path='/rosters' element={<Rosters />} />
            <Route path='/adm-rosters' element={<AdmRosters />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
