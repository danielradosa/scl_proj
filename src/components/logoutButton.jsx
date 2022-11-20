import { useNavigate } from "react-router-dom";
import React, { useCallback, useState } from "react";
import { Spinner } from "./Spinner";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [loggedOutState, setLoggedOutState] = useState(false);

  const handleLogout = useCallback(() => {
    setLoggedOutState(true);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="logout">
      {loggedOutState === true ? <Spinner /> : ""}
      <button onClick={handleLogout} className="bg-white rounded-lg text-slate-400 pl-4 pr-4 mt-6 mr-6 shadow-sm">
        Logout
      </button>
    </div>
  );
};

export { LogoutButton };
