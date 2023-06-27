import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/UserPages/SignupPage";
import ProfilePage from "./pages/UserPages/ProfilePage";
import LoginPage from "./pages/UserPages/LoginPage";
import AllLeaguesPage from "./pages/LeaguePages/AllLeaguesPage";
import CourtsPage from "./pages/LeaguePages/CourtsPage";
import GalleryPage from "./pages/LeaguePages/GalleryPage";
import GamesPage from "./pages/LeaguePages/GamesPage";
import LeaguePage from "./pages/LeaguePages/LeaguePage";
import PlayersPage from "./pages/TeamPages/PlayersPage";
import TeamsPage from "./pages/TeamPages/TeamsPage";
import CalendarPage from "./pages/UserPages/CalendarPage";
import AdminPage from "./pages/AdminPage";
import RulesPage from "./pages/RulesPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />

        <Route path="/leagues" element={<AllLeaguesPage />} />
        <Route path="/leagues/:leagueId" element={<LeaguePage />} />
        <Route path="/leagues/:leagueId/courts" element={<CourtsPage />} />
        <Route path="/leagues/:leagueId/gallery" element={<GalleryPage />} />
        <Route path="/leagues/:leagueId/games" element={<GamesPage />} />

        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/teams/:teamId/players" element={<PlayersPage />} />

        <Route path="/calendar" element={<CalendarPage />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/rules" element={<RulesPage />} />
      </Routes>
    </div>
  );
}

export default App;
