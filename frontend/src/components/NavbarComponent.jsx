import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Dropdown,
} from 'react-bootstrap';
import {
  Gauge,
  SquareGanttChart,
  Building2,
  ShoppingBasket,
  PackagePlus,
} from 'lucide-react';

const NavbarComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleResize = () => {
    if (window.innerWidth > 1200) {
      setMenuOpen(false);
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="navbar__component">
      <Navbar bg="primary" variant="dark" expand="lg" className="navbar-custom" style={{ backgroundColor: '#0064a1' }}>
        <Container className="d-flex justify-content-between align-items-center">
          {isMobile && (
            <Button
              variant="primary"
              className="navbar-toggler-icon"
              onClick={handleMenuToggle}
            ></Button>
          )}
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
          <Dropdown align="end" className="ms-3">
            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ backgroundColor: '#0064a1', border: 'none' }}>
              <i className="bi bi-person" style={{ fontSize: '1.5rem', color: 'white' }}></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Home</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-4">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

      <div className={`slide-in-menu ${menuOpen ? 'show' : ''}`}>
        <Nav className="flex-column p-4">
          <Nav.Link as={Link} to="/" className="d-flex align-items-center">
            <Gauge />
            <span className="ps-2 fs-5">Dashboard</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/category" className="d-flex align-items-center">
            <SquareGanttChart />
            <span className="ps-2 fs-5">Category</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/vendor" className="d-flex align-items-center">
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
        </Nav>
      </div>
    </div>
  );
}

export default NavbarComponent;
