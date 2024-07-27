import React from 'react'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import {
  Gauge,
  SquareGanttChart,
  Building2,
  ShoppingBasket,
  PackagePlus,
  PackageMinus,
} from 'lucide-react'

const Sidebar = () => {
  return (
    <div className={`slide-in-menu show`}>
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
        <Nav.Link as={Link} to="/sale" className="d-flex align-items-center">
          <PackageMinus />
          <span className="ps-2 fs-5">Sales</span>
        </Nav.Link>
      </Nav>
    </div>
  )
}

export default Sidebar
