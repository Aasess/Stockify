import React from 'react'

//ROUTER-DOM
import { BrowserRouter as Router } from 'react-router-dom'

//COMPONENTS
import RouteList from './RouteList'
import './App.css'
//LIB
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  return (
    <Router>
      <RouteList />
    </Router>
  )
}

export default App
