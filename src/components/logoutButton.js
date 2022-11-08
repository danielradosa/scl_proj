// create logoout button component
import React, { useCallback } from 'react';

export default function LogoutButton() {
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        window.location.href = '/';
    }, []);

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}