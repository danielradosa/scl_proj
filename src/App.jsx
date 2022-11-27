import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./Posts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsAuthenticated from "./components/IsAuthenticated";
import Landing from "./pages/Landing";
import { LogoutButton } from "./components/logoutButton";
import Profile from "./pages/Profile";
import { Navigation } from "./components/navigation";
import ProfileSettings from "./components/profileSettings";
import { Header } from "./components/header";
import Discover from "./pages/Discover";


function App() {

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
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
          <Route element={<Posts />} path="/dashboard" exact />
          <Route path="/settings" element={<ProfileSettings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userHandle" element={<Profile />} />
          <Route path="/discover" element={<Discover />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
