import React from 'react'

import { Navbar, Container, Dropdown, Button, Nav } from 'react-bootstrap'
import Sidebar from './Sidebar'

import { CircleUser } from 'lucide-react'

import { Outlet, useNavigate, Link } from 'react-router-dom'

const NavbarComponent = () => {
  const username = localStorage.getItem('username')

  const navigate = useNavigate()

  const handleLogOutFunctionality = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <div className="navbar__component">
      <Navbar
        variant="dark"
        expand="lg"
        className="navbar-custom position-fixed w-100"
        style={{ backgroundColor: '#343a40 !important' }}
      >
        <Container
          className="d-flex justify-content-between align-items-center mx-2"
          fluid={true}
        >
          <Navbar.Brand href="/" className="ms-3">
            Stockify
          </Navbar.Brand>
          <Dropdown align="end" className="ms-3">
            <Dropdown.Toggle
              variant="primary"
              id="dropdown-basic"
              style={{ backgroundColor: '#0064a1', border: 'none' }}
            >
              <div className="d-flex gap-2 align-items-center">
                <CircleUser />
                <span className="fw-bold">Welcome, {username} </span>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="mt-3">
              <Nav.Link as={Link} to="/profile" className="text-white ps-3">
                Profile
              </Nav.Link>
              <Dropdown.Divider />
              <Button
                variant="link"
                onClick={handleLogOutFunctionality}
                id="logout-btn"
              >
                Logout
              </Button>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
      <Sidebar />

      <main
        style={{ marginLeft: '250px', padding: '20px', paddingTop: '62px' }}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default NavbarComponent
