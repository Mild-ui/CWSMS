import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function ResetPassword() {
    const navigate = useNavigate();
    const [UserName, setUserName] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const handleReset = (e) => {
        e.preventDefault();

        if (NewPassword !== ConfirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const resetData = { UserName, NewPassword };

        axios.put('http://localhost:5000/reset-password', resetData)
            .then((res) => {
                alert('Password updated successfully');
                navigate('/');
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to complete password reset');
            });
    };

    return (
        <div className="flex h-screen  bg-slate-50 font-sans">
            <header className='w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-6 shadow-sm'>
                <div className="space-y-8">
                    <div className='logo border-b border-slate-100 pb-4'>
                        <p className='text-2xl font-extrabold text-black tracking-tight'>Car<span className='text-amber-500 font-medium italic font-serif'>Wash</span></p>
                    </div>

                    <nav className='navigation flex flex-col space-y-1'>
                        <Link to='/dashboard' className='px-4 py-2.5 rounded-lg text-sm font-semibold bg-amber-50 text-amber-600 transition-colors'>Dashboard</Link>
                        <Link to='/cars' className='px-4 py-2.5 rounded-lg text-sm font-semibold bg-amber-50 text-amber-600 transition-colors'>Cars</Link>
                        <Link to='/Package' className='px-4 py-2.5 rounded-lg text-sm font-semibold bg-amber-50 text-amber-600 transition-colors'>Services</Link>
                        <Link to='/Payment' className='px-4 py-2.5 rounded-lg text-sm font-semibold bg-amber-50 text-amber-600 transition-colors'>Payments</Link>
                        <Link to='/Reports' className='px-4 py-2.5 rounded-lg text-sm font-semibold bg-amber-50 text-amber-600 transition-colors'>Reports</Link>
                    </nav>
                </div>
                <div className='border-t border-slate-100 pt-4'>
                    <Link to='/reset' className='flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors'>
                        Settings
                    </Link>
                    <Link to='/logout' className='flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors'>
                        Logout
                    </Link>
                </div>
            </header>
            
            <div className="w-full max-w-md p-8 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="text-center space-y-2">
                    <p className="text-2xl font-extrabold text-black tracking-tight">
                        Car<span className="text-amber-500 font-medium italic font-serif">Wash</span>
                    </p>
                    <h3 className="text-lg font-bold text-slate-800">Reset Credentials</h3>
                </div>

                <form onSubmit={handleReset} className="space-y-4">
                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none text-gray-800 text-sm"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">New Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={NewPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none text-gray-800 text-sm"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Confirm New Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={ConfirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2.5 border border-gray-300 rounded focus:outline-none text-gray-800 text-sm"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full py-2.5 rounded-full bg-amber-400 text-white font-semibold shadow-sm hover:bg-amber-500 transition-colors text-sm">
                        Update Password
                    </button>
                </form>

                <div className="text-center pt-2">
                    <Link to="/" className="text-xs font-semibold text-amber-600 hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
