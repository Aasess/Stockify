import React, { Suspense, lazy } from 'react'

//ROUTER-DOM
import { Navigate, Route, Routes } from 'react-router-dom'

//COMPONENTS
import Dashboard from './components/Dashboard'
import UserLogin from './components/UserLogin'
import UserRegistration from './components/UserRegistration'
import UserForgetPassword from './components/UserForgetPassword'

const RouteList = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/login" exact element={<UserLogin />} />
        <Route path="/register" exact element={<UserRegistration />} />
        <Route path="/forget-password" exact element={<UserForgetPassword />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Suspense>
  )
}

export default RouteList
