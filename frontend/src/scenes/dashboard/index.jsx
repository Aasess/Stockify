import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Radar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CategoryAction from '../../api/category/action'
import VendorAction from '../../api/vendor/action'
import UserAction from '../../api/user/action'
import {
  SquareGanttChart,
  Building2,
  ShoppingBasket,
  PackageMinus,
} from 'lucide-react'
import ItemAction from '../../api/item/action'
import StockAction from '../../api/stock/action'
import useColumn from './useColumn'

const Dashboard = () => {
  const [state, setState] = useState({
    numCategories: 0,
    numVender: 0,
    numProducts: 0,
    outOfStockProducts: 0,
    mostStockItems: [],
  })

  const navigate = useNavigate()

  const { barData } = useColumn({ state })

  const checkIfUserIsLoggedInOrNot = async () => {
    try {
      const response = await UserAction.userDetails()
      return response
    } catch (error) {
      return navigate('/login')
    }
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

  const findTotalNumberOfCategories = async () => {
    const result = await CategoryAction.findNumberOfCategory()

    setState((prev) => {
      return {
        ...prev,
        numCategories: result?.Count,
      }
    })
  }

  const findTotalNumberOfVendors = async () => {
    const result = await VendorAction.findNumberOfVendor()

    setState((prev) => {
      return {
        ...prev,
        numVender: result?.Count,
      }
    })
  }

  const findTotalNumberOfItems = async () => {
    const result = await ItemAction.findNumberOfItem()

    setState((prev) => {
      return {
        ...prev,
        numProducts: result?.allRecords,
        outOfStockProducts: result?.outOfStockCount,
      }
    })
  }

  const findMostStockedItem = async () => {
    const result = await StockAction.findTopStockItems()

    setState((prev) => {
      return {
        ...prev,
        mostStockItems: result,
      }
    })
  }

  useEffect(() => {
    checkIfUserIsLoggedInOrNot().then((res) => {
      if (res) {
        findTotalNumberOfCategories()
        findTotalNumberOfVendors()
        findTotalNumberOfItems()
        findMostStockedItem()
      }
    })
  }, [])

  return (
    <div>
      <Container className="mt-4">
        {/* Top Summary Cards */}
        <div className="col-12 d-flex mb-4 gap-4 flex-wrap">
          <div className="custom-card">
            <div className="icon-box">
              <Building2 size={60} color="#6784f9" />
            </div>
            <div className="text-box">
              <h4>{state.numVender}</h4>
              <h6>Vendors</h6>
            </div>
          </div>
          <div className="custom-card">
            <div className="icon-box">
              <SquareGanttChart size={60} color="#e4c111" />
            </div>

            <div className="text-box">
              <h4>{state.numCategories}</h4>
              <h6>Categories</h6>
            </div>
          </div>
          <div className="custom-card">
            <div className="icon-box">
              <ShoppingBasket size={60} color="rgba(75,192,192,1)" />
            </div>

            <div className="text-box">
              <h4>{state.numProducts}</h4>
              <h6>Items</h6>
            </div>
          </div>
          <div className="custom-card">
            <div className="icon-box">
              <PackageMinus size={60} color="#FF6384" />
            </div>

            <div className="text-box">
              <h4>{state.outOfStockProducts}</h4>
              <h6>Out of Stock</h6>
            </div>
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
  )
}

export default Dashboard;
