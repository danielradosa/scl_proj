import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./Posts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsAuthenticated from "./components/IsAuthenticated";
import Landing from "./pages/Landing";
import { LogoutButton } from "./components/logoutButton";

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
              <Navigation />
              <LogoutButton />
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
