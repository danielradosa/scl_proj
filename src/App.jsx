import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IsAuthenticated from "./components/IsAuthenticated";
import { LogoutButton } from "./components/logoutButton";
import { Navigation } from "./components/navigation";
import ProfileSettings from "./components/profileSettings";
import { Header } from "./components/header";
import { Cookies } from "./pages/Cookies";
import Discover from "./pages/Discover";
import Bookmarks from "./pages/Bookmarks";
import Profile from "./pages/Profile";
import Posts from "./pages/Posts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          element={
            <>
              <Header />
              <br />
              <br />
              <br />
              <LogoutButton />
              <Navigation />
              <IsAuthenticated />
            </>
          }
        >
          <Route path="/dashboard" element={<Posts />} />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userHandle" element={<Profile />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="*" element={<h1>404: Not Found</h1>} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
