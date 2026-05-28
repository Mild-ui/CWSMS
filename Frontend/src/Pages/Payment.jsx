import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Payment() {

    const [Payment, SetPayment] = useState([]);

    const fetchPayments = () => {
        axios.get('http://localhost:5000/get-payment-record')
            .then(res => {
                SetPayment(res.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    useEffect(() => {
        fetchPayments()
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
                    <p className='text-slate-500 ml-1'>It shows the payment that have been made and the date.</p>
                </div>

                <div className="packages space-y-4">
                    <h1 className='text-2xl font-extrabold text-slate-800 tracking-tight'>Payments<span className='text-amber-500 font-medium italic font-serif'>Overview</span><Link to='/payment/new' className='ml-190 text-sm border-none rounded-full p-2 bg-amber-500'>+Add Payment</Link></h1>
                    <div className='overflow-x-auto'>
                        <table className='w-full text-left border-collapse'>
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    <th className='px-3 py-6'>No #</th>
                                    <th className='px-3 py-6'>Driver Name</th>
                                    <th className='px-3 py-6'>Plate Number</th>
                                    <th className='px-3 py-6'>Service Package</th>
                                    <th className='px-3 py-6'>Amount Paid</th>
                                    <th className='px-3 py-6'>Payment Date</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-100 text-sm text-slate-700'>

                                {Payment.map(Pay => (
                                    <tr key={Pay.PaymentNumber} className="hover:bg-slate-50/70 transition-colors">
                                        <td className='py-4 px-6 font-mono text-xs text-slate-400'># {Pay.PaymentNumber}</td>
                                        <td className='py-4 px-6'>{Pay.DriverName || 'N/A'}</td>
                                        <td className='py-4 px-6'>{Pay.PlateNumber || 'N/A'}</td>
                                        <td className='py-4 px-6'>{Pay.PackageNumber || 'N/A'}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-900">{Pay.AmountPaid} Rwf</td>
                                        <td className='py-4 px-6'>{Pay.PaymentDate}</td>
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
