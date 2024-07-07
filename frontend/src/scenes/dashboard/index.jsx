import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Radar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CategoryAction from '../../api/category/action';
import VendorAction from '../../api/vendor/action';
import UserAction from '../../api/user/action';

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [state, setState] = useState({
    numCategories: 0,
    numVender: 0,
  });

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const checkIfUserIsLoggedInOrNot = async () => {
    try {
      const response = await UserAction.userDetails();
      return response;
    } catch (error) {
      return navigate('/login');
    }
  };

  const doughnutData = {
    labels: ['Aspirin', 'Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Omeprazole'],
    datasets: [
      {
        data: [5000, 3000, 4000, 2000, 3500],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#B4B4B4'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#B4B4B4'],
      },
    ],
  };

  const radarData = {
    labels: ['Aspirin', 'Ibuprofen', 'Paracetamol', 'Amoxicillin', 'Omeprazole'],
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
  };
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
  };
  
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
  };
  

  const findTotalNumberOfCategories = async () => {
    const result = await CategoryAction.findNumberOfCategory()
  }

  const findTotalNumberOfVendors = async () => {
    const result = await VendorAction.findNumberOfVendor()
  }

  useEffect(() => {
    checkIfUserIsLoggedInOrNot().then((res) => {
      if (res) {
        findTotalNumberOfCategories();
        findTotalNumberOfVendors();
      }
    });
  }, []);

  const vendorData = {
    labels: ['Vendors'],
    datasets: [
      {
        label: 'Number of Vendors',
        data: [state.numVender],
        backgroundColor: ['#36A2EB'],
      },
    ],
  };

  const categoryData = {
    labels: ['Categories'],
    datasets: [
      {
        label: 'Number of Categories',
        data: [state.numCategories],
        backgroundColor: ['#FF6384'],
      },
    ],
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
        <Container className="d-flex justify-content-between align-items-center">
          <Button variant="dark" className="navbar-toggler-icon" onClick={handleMenuToggle}></Button>
          <Navbar.Brand href="#home" className="mx-auto">Stockify</Navbar.Brand>
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
  <Nav.Link href="#home">
      <i className="fas fa-home"></i> Category
    </Nav.Link>
    <Nav.Link href="#link">
      <i className="fas fa-users"></i> Vendors
    </Nav.Link>
    <Nav.Link href="#another">
      <i className="fas fa-user-shield"></i> Admin Portal
    </Nav.Link>
    <Nav.Link href="#another">
      <i className="fas fa-cogs"></i> Settings
    </Nav.Link>
  </Nav>
</div>




      <Container className="mt-4">
        {/* Top Summary Cards */}	
        <div className="col-12 d-flex justify-content-between">	
            <div className="card p-3 m-2 summary-card" style={{ width: '18rem' }}>	
              <h5 className="card-title">Number of Vendors</h5>	
              <p className="card-text">0</p>	
            </div>	
            <div className="card p-3 m-2 summary-card" style={{ width: '18rem' }}>	
              <h5 className="card-title">Number of Category</h5>	
              <p className="card-text">0</p>	
            </div>	
            <div className="card p-3 m-2 summary-card" style={{ width: '18rem' }}>	
              <h5 className="card-title">Number of Product 1</h5>	
              <p className="card-text">0</p>	
            </div>	
            <div className="card p-3 m-2 summary-card" style={{ width: '18rem' }}>	
              <h5 className="card-title">Number of Product 2</h5>	
              <p className="card-text">0</p>	
            </div>	
            <div className="card p-3 m-2 summary-card" style={{ width: '18rem' }}>	
              <h5 className="card-title">Number of Product 3</h5>	
              <p className="card-text">0</p>	
            </div>	
          </div>
        <div className="row">
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
        </div>
        
      </Container>
    </div>
  );
};

export default Dashboard;
