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

function App() {
  /*   const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const handle = user.handle; */

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/*         <Route path={`/${handle.slice(1)}`} element={<Profile />} />
         */}

        {/* Protected routes */}

        <Route
          element={
            <>
              <LogoutButton />
              <Navigation />
              <IsAuthenticated />
            </>
          }
        >
          <Route element={<Posts />} path="/dashboard" exact />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
