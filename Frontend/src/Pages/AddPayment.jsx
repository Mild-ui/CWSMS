import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AddPayment() {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    
    // Ensure your state keys match your backend column extraction keys perfectly
    const [payment, setPayment] = useState({
        AmountPaid: '',
        RecordNumber: '',
        PaymentDate: '' 
    });

    useEffect(() => {
        axios.get('http://localhost:5000/get-service-Package')
            .then(res => setServices(res.data))
            .catch(err => console.error("Error:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post('http://localhost:5000/create-payment-record', payment)
            .then(() => {
                alert('Payment Recorded successfully');
                navigate('/Payment');
            })
            .catch((err) => {
                console.error(err);
                alert('Error while recording the Payment');
            });
    };
    
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
                    <Link to='/logout' className='flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors'>Logout</Link>
                </div>
            </header>

            <main className='flex-1 p-10 overflow-y-auto space-y-8'>
                <div className="max-w-full">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Create New Payment</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div className="flex flex-col space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Select Car & Service</label>
                            <select
                                value={payment.RecordNumber}
                                onChange={(e) => setPayment({ ...payment, RecordNumber: e.target.value })}
                                className="w-full p-2.5 border border-gray-300 rounded focus:outline-none text-gray-800 text-sm bg-white"
                                required
                            >
                                <option value=""> Choose Target Unpaid Ticket </option>
                                {services.map((srv, idx) => (
                                    <option key={srv.RecordNumber || idx} value={srv.RecordNumber}>
                                        {srv.PlateNumber} ({srv.PackageName})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Amount Paid</label>
                                <input
                                    type="number"
                                    placeholder="Amount Paid"
                                    value={payment.AmountPaid}
                                    onChange={(e) => setPayment({ ...payment, AmountPaid: e.target.value })}
                                    className="w-full p-2.5 border border-gray-300 rounded focus:outline-none text-gray-800 text-sm"
                                    required
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 pl-1">Payment Date</label>
                                <input
                                    type="datetime-local"
                                    value={payment.PaymentDate}
                                    onChange={(e) => setPayment({ ...payment, PaymentDate: e.target.value })}
                                    className="w-full p-2.5 border border-gray-300 rounded focus:outline-none text-gray-800 text-sm bg-white"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button type="submit" className="w-full py-2.5 rounded-full bg-amber-400 text-white font-semibold text-sm">Save Payment</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
