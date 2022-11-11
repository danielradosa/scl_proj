import { useNavigate } from "react-router-dom";
import React, { useCallback } from 'react';

export default function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = useCallback(() => {
        const storage = localStorage && sessionStorage;
        storage.removeItem('token');
        storage.removeItem('currentUserHandle');
        storage.removeItem("profilePicture");
        navigate('/login');
    }, [navigate]);

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}