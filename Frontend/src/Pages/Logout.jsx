import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        alert('You have logged out successfully');
        navigate('/');
    }, [navigate]);

    return (
        <div className="flex h-screen items-center justify-center bg-slate-50 font-sans">
            <div className="text-center space-y-2">
                <p className="text-sm font-semibold text-slate-500 animate-pulse">Logging you out securely...</p>
            </div>
        </div>
    );
}
