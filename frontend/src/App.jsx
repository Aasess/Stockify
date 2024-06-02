import React from 'react'

//ROUTER-DOM
import { BrowserRouter as Router } from 'react-router-dom'

//COMPONENTS
import RouteList from './RouteList'

//LIB
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <RouteList />
    </Router>
  )
}

export default App
