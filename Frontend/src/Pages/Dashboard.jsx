import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [PackageList, SetPackageList] = useState([]);

    const fetchCars = () => {
        axios.get('http://localhost:5000/get-packages')
            .then(res => {
                SetPackageList(res.data)
            })
            .catch(err => {
                console.error('Error while fetching packages', err)
            })
    }

    useEffect(() => {
        fetchCars();
    }, [])
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

            <main className='flex-1 p-10 overflow-y-auto space-y-6'>
                <div className='heading'>
                    <h2 className='text-2xl font-bold text-slate-600'>Car wash System</h2>
                    <p className='text-slate-500 ml-1'>It shows the Services we provide and currency per each service</p>
                </div>

                <div className="cars space-y-4">
                    <h1 className='text-2xl font-extrabold text-slate-800 tracking-tight'>Cars<span className='text-amber-500 font-medium italic font-serif'>Overview</span>
                    {/* <Link to='/car/new' className='ml-200 text-sm border-none rounded-full p-2 bg-amber-500'>+Add Package</Link> */}
                    </h1>

                    <div className='overflow-x-auto'>
                        <table className='w-full text-left border-collapse'>
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    <th className='px-3 py-6'># No</th>
                                    <th className='px-3 py-6'>Package Name</th>
                                    <th className='px-3 py-6'>Package Description</th>
                                    <th className='px-3 py-6'>Package Price</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-100 text-sm text-slate-700'>

                                {PackageList.map(Packages => (
                                    <tr key={Packages.PackageNumber} className="hover:bg-slate-50/70 transition-colors">
                                        <td className='py-4 px-6 font-mono text-xs text-slate-400'># {Packages.PackageNumber}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-900">{Packages.PackageName}</td>
                                        <td className='py-4 px-6'>{Packages.PackageDescription}</td>
                                        <td className='py-4 px-6 font-medium text-amber-600"'>{Packages.PackagePrice}</td>
                                        {/* <td className='py-4 px-6 font-medium text-amber-600"'>+250{cars.PhoneNumber}</td>
                                        <td className='py-4 px-6 font-medium text-amber-600'>
                                            <Link to={`/update-car/${cars.plateNumber}`}>Update</Link>
                                            <Link className='p-2 cursor-pointer' onClick={() => {
                                                axios.delete(`http://localhost:5000/delete-car/${cars.PlateNumber}`)
                                                    .then(response => {
                                                        console.log('Car deleted successfully', response.data);
                                                        SetCarList(CarList.filter(c => c.PlateNumber !== cars.id));
                                                    })
                                                    .catch(error => {
                                                        console.error('Error deleting Car', error);
                                                    });
                                            }}>
                                                Delete
                                            </Link>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
