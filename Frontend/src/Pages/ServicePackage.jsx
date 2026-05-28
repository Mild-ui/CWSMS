import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ServicePackage() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [packages, setPackages] = useState([]);
    const [service, setService] = useState({
        PlateNumber: '',
        PackageNumber: '',
        ServiceDate: '' // Uses native HTML5 datetime-local string format
    });

    // Fetch cars and packages on component mount to fill out the dropdown fields
    useEffect(() => {
        // 1. Fetch Registered Vehicles
        axios.get('http://localhost:5000/get-cars')
            .then(res => setCars(res.data))
            .catch(err => console.error("Error fetching cars:", err));

        // 2. Fetch Wash Packages
        axios.get('http://localhost:5000/get-packages')
            .then(res => setPackages(res.data))
            .catch(err => console.error("Error fetching packages:", err));

        // Set default time to right now
        const now = new Date();
        const currentDateTime = now.toLocaleString('sv-SE').replace(' ', 'T').slice(0, 16);
        setService(prev => ({ ...prev, ServiceDate: currentDateTime }));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Pass values directly to backend without complex formatting strings
        const payload = {
            RecordNumber: null, // Left null since MariaDB handles auto_increment
            PackageNumber: service.PackageNumber,
            PlateNumber: service.PlateNumber,
            ServiceDate: service.ServiceDate
        };

        axios.post('http://localhost:5000/create-service-package', payload)
            .then(() => {
                alert('The Service Created Successfully');
                navigate('/Package'); // Redirect back to services overview list
            })
            .catch((err) => {
                console.error(err);
                alert('Failed to save service package');
            });
    };

    return (
        <div className='flex h-screen bg-slate-50 font-sans'>
            {/* Consistent Left Sidebar */}
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

            {/* Main Workspace */}
            <main className='flex-1 p-10 overflow-y-auto space-y-8'>
                <div className="max-w-full">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Log New Car Service</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Car Selector Dropdown */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Select Vehicle Plate</label>
                            <select
                                value={service.PlateNumber}
                                onChange={(e) => setService({ ...service, PlateNumber: e.target.value })}
                                className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-800 text-sm bg-white"
                                required
                            >
                                <option value="">-- Choose Car --</option>
                                {cars.map((car) => (
                                    <option key={car.PlateNumber} value={car.PlateNumber}>
                                        {car.PlateNumber} ({car.DriverName})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Package Selector Dropdown */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Select Wash Package</label>
                            <select
                                value={service.PackageNumber}
                                onChange={(e) => setService({ ...service, PackageNumber: e.target.value })}
                                className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-800 text-sm bg-white"
                                required
                            >
                                <option value="">-- Choose Package --</option>
                                {packages.map((pkg) => (
                                    <option key={pkg.PackageNumber} value={pkg.PackageNumber}>
                                        {pkg.PackageName} - {pkg.PackagePrice} Rwf
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Native Datetime-local Picker Box */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Service Date & Time</label>
                            <input
                                type="datetime-local"
                                value={service.ServiceDate}
                                onChange={(e) => setService({ ...service, ServiceDate: e.target.value })}
                                className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-800 text-sm bg-white"
                                required
                            />
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="submit" className="w-full py-2.5 rounded-full bg-amber-400 text-white font-semibold shadow-sm hover:bg-amber-500 transition-colors text-sm">Save Service Record</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
