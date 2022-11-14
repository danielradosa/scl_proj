import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.clear();
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1500);
  }, [navigate]);

  return <button onClick={handleLogout}>Logout</button>;
};

export { LogoutButton };
