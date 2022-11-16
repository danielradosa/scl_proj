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
    <div>
      <div className="l">{loggedOutState === true ? <Spinner /> : ""}</div>
      <button onClick={handleLogout} className="logout">
        Logout
      </button>
    </div>
  );
};

export { LogoutButton };
