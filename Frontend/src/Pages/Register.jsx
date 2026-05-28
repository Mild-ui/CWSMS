import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function Register() {
    const [UserName , setUserName] = useState('');
    const [Password , setPassword] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const UserData = {UserName , Password}
        axios.post('http://localhost:5000/register' , UserData)
        .then(res => {
            console.log(res.data);
            alert('User Registered in successfull');

        })
        .catch(err => {
            console.log(err)
            alert('User Failed to be Registered in successfull');
        })
    }
  return (
    <div className='flex h-screen '>
      <form onSubmit={handleRegister} className='m-auto flex flex-col gap-4 w-96 p-4 border rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center'>Register</h1>
        <input type="text" placeholder='UserName' value={UserName} onChange={(e) => setUserName(e.target.value)} className='border p-2 rounded' />
        <input type="password" placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} className='border p-2 rounded' />
        <button type='submit' className='bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition'>Register</button>
        <p className='text-gray-400 text-sm text-center'>Already have an account? <Link to='/' className='hover:text-bold'>Login</Link></p>
      </form>
    </div>
  )
}
