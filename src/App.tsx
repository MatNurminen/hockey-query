import { lazy, Suspense } from "react";
import "./App.css";

import { ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Routes, Route } from "react-router";

import queryClient from "./api/queryClient";

import theme from "./components/ui/Theme";

import Navbar from "./components/layout/Navbar";
import AdminNavbar from "./components/layout/AdminNavbar";
import SearchBar from "./components/layout/SearchBar";
import Loading from "./components/layout/React-query/loading";
import Footer from "./components/layout/Footer";

const Main = lazy(() => import("./components/main"));
const NotFound = lazy(() => import("./components/notFound"));

const Leagues = lazy(() => import("./components/leagues/leagues"));
const League = lazy(() => import("./components/leagues/league"));
const PlayersStats = lazy(() => import("./components/leagues/stats"));

const Nations = lazy(() => import("./components/nations/nations"));
const Nation = lazy(() => import("./components/nations/nation"));
const NationStats = lazy(() => import("./components/nations/stats"));

const Teams = lazy(() => import("./components/teams/teams"));
const Team = lazy(() => import("./components/teams/team"));

const Player = lazy(() => import("./components/players/player"));
const FreeAgents = lazy(() => import("./components/players/free-agents"));
const Drafts = lazy(() => import("./components/players/drafts"));
const DraftDetails = lazy(
  () => import("./components/players/drafts/draftDetails"),
);

const Tournaments = lazy(() => import("./components/tournaments"));
const Tournament = lazy(
  () => import("./components/admin/tournaments/updateTournament"),
);

const Rosters = lazy(() => import("./components/rosters"));
const AdmRosters = lazy(() => import("./components/admin/rosters"));

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
            <Route path="/" element={<Main />} />

            <Route path="/leagues" element={<Leagues />} />
            <Route path="/leagues/:id" element={<League />} />
            <Route path="/league-stats" element={<PlayersStats />} />

            <Route path="/nations" element={<Nations />} />
            <Route path="/nations/:id" element={<Nation />} />
            <Route path="/nation" element={<NationStats />} />

            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<Team />} />

            <Route path="/players/:id" element={<Player />} />
            <Route path="/free-agents" element={<FreeAgents />} />

            <Route path="/drafts" element={<Drafts />} />
            <Route path="/drafts/dets" element={<DraftDetails />} />

            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/tournaments/:id" element={<Tournament />} />

            <Route path="/rosters" element={<Rosters />} />
            <Route path="/adm-rosters" element={<AdmRosters />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </ThemeProvider>

      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
