import { useNavigate } from "react-router-dom";
import React, { useCallback } from 'react';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/login');
    }, [navigate]);

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}