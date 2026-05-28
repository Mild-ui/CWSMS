import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Services() {
    const [PackagesList, SetPackagesList] = useState([])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/get-packages', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                SetPackagesList(response.data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

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
                <div className="heading">
                    <h2 className='text-2xl font-bold text-slate-800'> Car wash System</h2>
                    <p className='text-slate-500 mt-1'>It shows the Services we provide and currency per each service</p>
                </div>

                <div className="package-overview space-y-4">
                    <h1 className='text-2xl font-extrabold text-slate-800 tracking-tight'>Packages <span className='text-amber-500 font-medium italic font-serif'>Overview</span><Link to='/add-service-Package' className='ml-180 text-sm border-none rounded-full p-2 bg-amber-500'>+Service Package</Link></h1>

                    {loading ? (
                        <div className="text-slate-500 font-medium">Loading Packages...</div>
                    ) : PackagesList.length === 0 ? (
                        <div className="text-slate-500 font-medium p-6 bg-white border border-dashed border-slate-200 rounded-2xl text-center">
                            No products found in the database.
                        </div>
                    ) : (
                        <div className="Paclage grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {PackagesList.map((Package) => (
                                <div key={Package.PackageNumber} className="package bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                                    <div className='w-full h-40 bg-linear-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center text-amber-600 font-bold text-xs tracking-wider uppercase border-b border-slate-50'>
                                        <span>Code: #{Package.PackageNumber}</span>
                                    </div>

                                    <div className="content p-5 flex flex-col justify-between flex-1 space-y-4">
                                        <div>
                                            <h3 className='text-lg font-bold text-slate-900 capitalize'>{Package.PackageName || 'Unnamed Product'}</h3>
                                            <div className="mt-2 space-y-1 text-sm text-slate-500">
                                                <p><span className="font-medium text-slate-700">Description:</span> {Package.PackageDescription || ''}</p>
                                                <p><span className="font-medium text-slate-700">Package Price:</span> {Package.PackagePrice || 0} Rwf</p>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                                            <span className='text-emerald-600 bg-emerald-50 text-xs font-semibold px-2 py-0.5 rounded-full h-fit'>Active</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
