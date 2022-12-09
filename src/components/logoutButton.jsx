import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    sessionStorage.clear();
    localStorage.clear();
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
