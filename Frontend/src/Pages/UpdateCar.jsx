import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function UpdateCar() {
    const { PlateNumber } = useParams();
    const navigate = useNavigate();

    const [editingCar, setEditingCar] = useState({
        PlateNumber: '',
        CarType: '',
        CarSize: '',
        DriverName: '',
        PhoneNumber: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/get-car/${PlateNumber}`)
            .then((res) => {
                if (res.data) {
                    setEditingCar(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to fetch car details');
            });
    }, [PlateNumber]);


    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/update-car/${PlateNumber}`, editingCar)
            .then(() => {
                alert('Car Updated successfully');
                navigate('/cars');
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to update car');
                navigate('/cars');
            });
    };

    // Prevent rendering form if data is completely missing or reset
    if (!editingCar) return <div className="p-10">Loading...</div>;

    return (
        <div className='flex h-screen bg-slate-50 font-sans'>
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
                    <Link to='/logout' className='flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors'>
                        Logout
                    </Link>
                </div>
            </header>

            <main className='flex-1 p-10 overflow-y-auto space-y-8'>
                <div className="max-w-md">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Update Car Details</h3>
                    <form onSubmit={handleUpdate} className="space-y-5">
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Plate Number</label>
                            <input type="text" placeholder="Plate Number" value={editingCar.PlateNumber || ''} onChange={(e) => setEditingCar({ ...editingCar, PlateNumber: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-800 text-sm placeholder-gray-400" required disabled />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Car Type</label>
                                <input type="text" placeholder="Car Brand" value={editingCar.CarType || ''} onChange={(e) => setEditingCar({ ...editingCar, CarType: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-800 text-sm placeholder-gray-400" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Car Size</label>
                                <input type="text" placeholder="Small, Medium, Big" value={editingCar.CarSize || ''} onChange={(e) => setEditingCar({ ...editingCar, CarSize: e.target.value })} className="w-full p-2.5 border-b border-amber-400 focus:outline-none text-gray-800 text-sm placeholder-gray-400" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Driver Name</label>
                                <input type="text" placeholder="Driver Name" value={editingCar.DriverName || ''} onChange={(e) => setEditingCar({ ...editingCar, DriverName: e.target.value })} className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-800 text-sm placeholder-gray-400" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Phone Number</label>
                                <input type="tel" placeholder="Phone Number" value={editingCar.PhoneNumber || ''} onChange={(e) => setEditingCar({ ...editingCar, PhoneNumber: e.target.value })} className="w-full p-2.5 border-b border-amber-400 focus:outline-none text-gray-800 text-sm placeholder-gray-400" required />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button type="submit" className="w-full py-2.5 rounded-full bg-amber-400 text-white font-semibold shadow-sm hover:bg-amber-500 transition-colors text-sm">Save Changes</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
