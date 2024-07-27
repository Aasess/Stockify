import React, { Suspense, lazy } from 'react'

//ROUTER-DOM
import { Navigate, Route, Routes } from 'react-router-dom'

//COMPONENTS
import UserLogin from './components/UserLogin'
import UserRegistration from './components/UserRegistration'
import UserForgetPassword from './components/UserForgetPassword'
import UserResetPassword from './components/UserResetPassword'
import Loader from './components/Loader'
import Sale from './scenes/sale'
import NavbarComponent from './components/NavbarComponent'

const Dashboard = lazy(() => import('./scenes/dashboard'))
const Category = lazy(() => import('./scenes/category'))
const Vendor = lazy(() => import('./scenes/vendor'))
const Item = lazy(() => import('./scenes/item'))
const Stock = lazy(() => import('./scenes/stock'))

const RouteList = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" exact element={<UserLogin />} />
        <Route path="/register" exact element={<UserRegistration />} />
        <Route path="/forget-password" exact element={<UserForgetPassword />} />
        <Route
          path="/reset-password/:id"
          exact
          element={<UserResetPassword />}
        />

        <Route path="/" element={<NavbarComponent />}>
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/category" exact element={<Category />} />
          <Route path="/vendor" exact element={<Vendor />} />
          <Route path="/item" exact element={<Item />} />
          <Route path="/stock" exact element={<Stock />} />
          <Route path="/sale" exact element={<Sale />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default RouteList
