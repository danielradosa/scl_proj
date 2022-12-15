import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import Swal from 'sweetalert2'

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    Swal.fire({
      title: 'Logged out!',
      text: 'You have now logged out',
      icon: 'success',
      confirmButtonText: 'Close'
    })
    navigate("/login");
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