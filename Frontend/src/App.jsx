import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/Dashboard'
import ProtectedRoute from './Pages/ProtectedRoute'
import Car from './Pages/Car'
import AddCar from './Pages/AddCar'
import UpdateCar from './Pages/UpdateCar'
import Services from './Pages/Services'
import Payment from './Pages/Payment'
import AddPayment from './Pages/AddPayment'
import Reports from './Pages/Reports'
import ServicePackage from './Pages/ServicePackage'
import Logout from './Pages/Logout'
import ResetPassword from './Pages/ResetPassword'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/cars' element={
          <ProtectedRoute>
            <Car />
          </ProtectedRoute>
        } />
        <Route path='/car/new' element={
          <ProtectedRoute>
            <AddCar />
          </ProtectedRoute>
        } />
        <Route path='/update-car/:PlateNumber' element={
          <ProtectedRoute>
            <UpdateCar />
          </ProtectedRoute>
        } />
        <Route path='/Package' element={
          <ProtectedRoute>
            <Services />
          </ProtectedRoute>
        } />
        <Route path='/Payment' element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
        <Route path='/payment/new' element={
          <ProtectedRoute>
            <AddPayment />
          </ProtectedRoute>
        } />
        <Route path='/Reports' element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
        <Route path='/add-service-Package' element={
          <ProtectedRoute>
            <ServicePackage />
          </ProtectedRoute>
        } />
        <Route path='/logout' element={
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        } />
        <Route path='/reset' element={
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}
