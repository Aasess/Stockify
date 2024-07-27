import React, { useEffect, useState } from 'react'
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
import { useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    setActiveLink(location.pathname.split('/')[1])
  }, [location])

  return (
    <div className={`slide-in-menu show`}>
      <Nav className="flex-column p-4">
        <Nav.Link
          as={Link}
          to="/"
          className={`d-flex align-items-center gap-2 ${
            activeLink === 'dashboard' ? 'active' : ''
          }`}
        >
          <Gauge size={26} />
          <span className="ps-2 fs-5">Dashboard</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/category"
          className={`d-flex align-items-center gap-2 ${
            activeLink === 'category' ? 'active' : ''
          }`}
        >
          <SquareGanttChart size={26} />
          <span className="ps-2">Category</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/vendor"
          className={`d-flex align-items-center gap-2 ${
            activeLink === 'vendor' ? 'active' : ''
          }`}
        >
          <Building2 size={26} />
          <span className="ps-2 fs-5">Vendor</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/item"
          className={`d-flex align-items-center gap-2 ${
            activeLink === 'item' ? 'active' : ''
          }`}
        >
          <ShoppingBasket size={26} />
          <span className="ps-2 fs-5">Item</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/stock"
          className={`d-flex align-items-center gap-2 ${
            activeLink === 'stock' ? 'active' : ''
          }`}
        >
          <PackagePlus size={26} />
          <span className="ps-2 fs-5">Stock</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/sale"
          className={`d-flex align-items-center gap-2 ${
            activeLink === 'sale' ? 'active' : ''
          }`}
        >
          <PackageMinus size={26} />
          <span className="ps-2 fs-5">Sales</span>
        </Nav.Link>
      </Nav>
    </div>
  )
}

export default Sidebar
