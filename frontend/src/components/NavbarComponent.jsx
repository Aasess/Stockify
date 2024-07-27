import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from 'react-bootstrap'
import {
  Gauge,
  SquareGanttChart,
  Building2,
  ShoppingBasket,
  PackagePlus,
} from 'lucide-react'

const NavbarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className="navbar__component">
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
        <Container className="d-flex justify-content-between align-items-center">
          <Button
            variant="dark"
            className="navbar-toggler-icon"
            onClick={handleMenuToggle}
          ></Button>
          <Navbar.Brand href="/" className="ms-3">
            Stockify
          </Navbar.Brand>
          <Form className="d-flex ms-auto">
            <FormControl
              type="search"
              placeholder="Search..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Container>
      </Navbar>

      <div className={`slide-in-menu ${menuOpen ? 'show' : ''}`}>
        <Nav className="flex-column p-4">
          <Nav.Link as={Link} to="/" className="d-flex align-items-center">
            <Gauge />
            <span className="ps-2 fs-5">Dashboard</span>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/category"
            className="d-flex align-items-center"
          >
            <SquareGanttChart />
            <span className="ps-2 fs-5">Category</span>
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/vendor"
            className="d-flex align-items-center"
          >
            <Building2 />
            <span className="ps-2 fs-5">Vendor</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/item" className="d-flex align-items-center">
            <ShoppingBasket />
            <span className="ps-2 fs-5">Item</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/stock" className="d-flex align-items-center">
            <PackagePlus />
            <span className="ps-2 fs-5">Stock</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/sale" className="d-flex align-items-center">
            <PackagePlus />
            <span className="ps-2 fs-5">Sales</span>
          </Nav.Link>
        </Nav>
      </div>
    </div>
  )
}

export default NavbarComponent
