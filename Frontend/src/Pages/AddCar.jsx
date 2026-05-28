import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function AddCar() {
    const [PlateNumber, setPlateNumber] = useState('');
    const [CarType, setCarType] = useState('');
    const [CarSize, setCarSize] = useState('');
    const [DriverName, setDriverName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate('')

    const handleAddCar = (e) => {
        e.preventDefault();
        const CarData = { PlateNumber, CarType, CarSize, DriverName, PhoneNumber }
        axios.post('http://localhost:5000/store-car', CarData)
            .then(res => {
                console.log(res.data)
                alert('Car Created Successfully')
                navigate('/cars');

            })
            .catch(err => {
                console.log(err)
                alert('Car failed to be created')
                navigate('/cars')
            })
    }
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
                <div className="max-w-full">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Create New Car</h3>
                    <form onSubmit={handleAddCar} className="space-y-5">
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Plate Number</label>
                            <input type="text" placeholder="Plate Number" value={PlateNumber} onChange={(e) => setPlateNumber(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-800 text-sm placeholder-gray-400" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Car Type</label>
                                <input type="text" placeholder="Car Brand" value={CarType} onChange={(e) => setCarType(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-800 text-sm placeholder-gray-400" required />
                            </div>
                            
                            {/* Updated Car Size Dropdown with clean static logic */}
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Car Size</label>
                                <select 
                                    value={CarSize} 
                                    onChange={(e) => setCarSize(e.target.value)} 
                                    className="w-full p-2.5 border-b border-amber-400 bg-white focus:outline-none text-gray-800 text-sm" 
                                    required
                                >
                                    <option value="">-- Select Size --</option>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Big">Big</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Driver Name</label>
                                <input type="text" placeholder="Driver Name" value={DriverName} onChange={(e) => setDriverName(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-0 focus:border-gray-300 text-gray-800 text-sm placeholder-gray-400" required />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Phone Number</label>
                                <input type="tel" placeholder="Phone Number" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-2.5 border-b border-amber-400 focus:outline-none text-gray-800 text-sm placeholder-gray-400" required />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button type="submit" className="w-full py-2.5 rounded-full bg-amber-400 text-white font-semibold shadow-sm hover:bg-amber-500 transition-colors text-sm">Save Car record</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}
