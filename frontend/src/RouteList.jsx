import React, { Suspense, lazy, useEffect } from 'react'

//ROUTER-DOM
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

//API
import UserAction from './api/user/action'

//COMPONENTS
import UserLogin from './components/UserLogin'
import UserRegistration from './components/UserRegistration'
import UserForgetPassword from './components/UserForgetPassword'
import UserResetPassword from './components/UserResetPassword'
const Dashboard = lazy(() => import('./scenes/dashboard'))

const RouteList = () => {
  const navigate = useNavigate()

  const checkIfUserIsLoggedInOrNot = async () => {
    try {
      await UserAction.userDetails()
    } catch (error) {
      navigate('/login')
    }
  }

  useEffect(() => {
    checkIfUserIsLoggedInOrNot()
  }, [])

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/login" exact element={<UserLogin />} />
        <Route path="/register" exact element={<UserRegistration />} />
        <Route path="/forget-password" exact element={<UserForgetPassword />} />
        <Route
          path="/reset-password/:id"
          exact
          element={<UserResetPassword />}
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Suspense>
  )
}

export default RouteList
