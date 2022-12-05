import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // remove token and all user info from local and session storage
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="logout">
      <button onClick={handleLogout} className="bg-white rounded-lg text-slate-400 pl-4 pr-4 mt-6 mr-6 shadow-sm">
        Logout
      </button>
    </div>
  );
};

export { LogoutButton };
