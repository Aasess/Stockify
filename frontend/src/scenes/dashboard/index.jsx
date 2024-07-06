import React, { useState } from 'react'
import { Bar, Doughnut, Radar, Line } from 'react-chartjs-2'
import 'chart.js/auto'

import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
} from 'react-bootstrap'

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  const doughnutData = {
    labels: [
      'Aspirin',
      'Ibuprofen',
      'Paracetamol',
      'Amoxicillin',
      'Omeprazole',
    ],
    datasets: [
      {
        data: [5000, 3000, 4000, 2000, 3500],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#B4B4B4',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#FF9F40',
          '#B4B4B4',
        ],
      },
    ],
  }

  const barData = {
    labels: [
      'Aspirin',
      'Ibuprofen',
      'Paracetamol',
      'Amoxicillin',
      'Omeprazole',
    ],
    datasets: [
      {
        label: 'Average Inventory Levels',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [5000, 3000, 4000, 2000, 3500],
      },
    ],
  }

  const radarData = {
    labels: [
      'Aspirin',
      'Ibuprofen',
      'Paracetamol',
      'Amoxicillin',
      'Omeprazole',
    ],
    datasets: [
      {
        label: 'Average Usage',
        backgroundColor: 'rgba(179,181,198,0.2)',
        borderColor: 'rgba(179,181,198,1)',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: [65, 59, 90, 81, 56],
      },
    ],
  }

  const lineData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Quarterly Sales',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10000, 15000, 12000, 17000],
      },
    ],
  }

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand href="#home">Stockify</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light">Search</Button>
              </Form>
            </Nav>
            <Nav>
              <NavDropdown
                title="Admin/User"
                id="basic-nav-dropdown"
                show={menuOpen}
                onClick={handleMenuToggle}
                align="end"
              >
                <NavDropdown.Item href="#action/3.1">
                  Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Manage Stocks
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Manage Sales
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Manage Inventory
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.5">Settings</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#notifications" className="nav-icon">
                <i className="fas fa-bell"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Dashboard Content */}
      <Container className="mt-4">
        <div className="row">
          {/* Charts Section */}
          <div className="col-12">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="chart-card">
                  <Radar data={radarData} />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="chart-card">
                  <Doughnut data={doughnutData} />
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6 mb-4">
                <div className="chart-card">
                  <Bar data={barData} />
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="chart-card">
                  <Line data={lineData} />
                </div>
              </div>
            </div>
          </div>
          {/* Top Summary Cards */}
          <div className="col-12 d-flex justify-content-between">
            <div
              className="card p-3 m-2 summary-card"
              style={{ width: '18rem' }}
            >
              <h5 className="card-title">Number of Aspirin</h5>
              <p className="card-text">5000</p>
            </div>
            <div
              className="card p-3 m-2 summary-card"
              style={{ width: '18rem' }}
            >
              <h5 className="card-title">Number of Ibuprofen</h5>
              <p className="card-text">3000</p>
            </div>
            <div
              className="card p-3 m-2 summary-card"
              style={{ width: '18rem' }}
            >
              <h5 className="card-title">Number of Paracetamol</h5>
              <p className="card-text">4000</p>
            </div>
            <div
              className="card p-3 m-2 summary-card"
              style={{ width: '18rem' }}
            >
              <h5 className="card-title">Number of Amoxicillin</h5>
              <p className="card-text">2000</p>
            </div>
            <div
              className="card p-3 m-2 summary-card"
              style={{ width: '18rem' }}
            >
              <h5 className="card-title">Number of Omeprazole</h5>
              <p className="card-text">3500</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Dashboard
