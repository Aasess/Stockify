import React, { useEffect } from 'react'

//ROUTER-DOM
import { BrowserRouter as Router } from 'react-router-dom'

//COMPONENTS
import RouteList from './RouteList'

//LIB
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserAction from './api/user/action'

function App() {
  const checkIfUserIsLoggedInOrNot = async () => {
    await UserAction.userDetails()
  }
  useEffect(() => {
    checkIfUserIsLoggedInOrNot()
  }, [])

  return (
    <Router>
      <RouteList />
    </Router>
  )
}

export default App
