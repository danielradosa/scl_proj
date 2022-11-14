import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./Posts";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import IsAuthenticated from "./components/IsAuthenticated";
import { LogoutButton } from "./components/logoutButton";

function App() {
  const user = localStorage.getItem("currentUser") || sessionStorage.getItem("currentUser");

  return (
    <Router>
      <Routes>
        {/* Public routes */}

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}

        <Route
          element={
            <>
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
