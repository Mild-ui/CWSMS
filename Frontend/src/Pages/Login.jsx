import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [UserName , setUserName] = useState('');
    const [Password , setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault();
        const UserData = {UserName , Password}
        axios.post('http://localhost:5000/login' , UserData)
        .then(res => {
            console.log(res.data);
            alert('User Logged in successfull');
            localStorage.setItem('token' , res.data.token)
            navigate('/dashboard')
        })
        .catch(err => {
            console.log(err)
            alert('User Failed to be Logged in successfull');
        })
    }
  return (
    <div className='flex h-screen '>
      <form onSubmit={handleLogin} className='m-auto flex flex-col gap-4 w-96 p-4 border rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center'>Login</h1>
        <input type="text" placeholder='UserName' value={UserName} onChange={(e) => setUserName(e.target.value)} className='border p-2 rounded' />
        <input type="password" placeholder='Password' value={Password} onChange={(e) => setPassword(e.target.value)} className='border p-2 rounded' />
        <button type='submit' className='bg-amber-500 text-white p-2 rounded hover:bg-amber-600 transition'>Login</button>

        <p className='text-gray-400 text-sm text-center'>Don't have an account? <Link to='/register' className='hover:text-bold'>Register</Link></p>
      </form>
    </div>
  )
}
