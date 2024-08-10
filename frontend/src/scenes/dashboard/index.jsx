import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Pie, Line } from 'react-chartjs-2'
import 'chart.js/auto'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CategoryAction from '../../api/category/action'
import VendorAction from '../../api/vendor/action'
import UserAction from '../../api/user/action'
import DashboardAction from '../../api/dasboard/action'

import {
  SquareGanttChart,
  Building2,
  ShoppingBasket,
  PackageMinus,
} from 'lucide-react'
import ItemAction from '../../api/item/action'
import StockAction from '../../api/stock/action'
import useColumn from './useColumn'
import Loader from '../../components/Loader'

const Dashboard = () => {
  const [state, setState] = useState({
    numCategories: 0,
    numVender: 0,
    numProducts: 0,
    outOfStockProducts: 0,
    mostStockItems: [],
    mostBeneficialItems: [],
    frequentlySoldItems: [],
    mostStockedCategories: [],
    mostSoldCategories: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const {
    barMostStockItem,
    barMostStockOptions,
    doughnutMostBeneficialData,
    doughnutMostBeneficialOptions,
    pieMostStockedData,
    pieMostStockedOptions,
    barFrequentlySoldData,
    barFrequentlySoldOptions,
  } = useColumn({ state })

  const checkIfUserIsLoggedInOrNot = async () => {
    try {
      setIsLoading(true)
      const response = await UserAction.userDetails()
      setIsLoading(false)
      return response
    } catch (error) {
      return navigate('/login')
    }
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

  const findAllDashboardForGraph = async () => {
    const mostBeneficialItems = await DashboardAction.getMostBeneficialItems()
    const frequentlySoldItems = await DashboardAction.getFrequentlySoldItems()
    const mostStockedCategories =
      await DashboardAction.getMostStockedCategories()
    const mostSoldCategories = await DashboardAction.getMostSoldCategories()

    setState((prev) => {
      return {
        ...prev,
        mostBeneficialItems,
        frequentlySoldItems,
        mostStockedCategories,
        mostSoldCategories,
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
        findAllDashboardForGraph()
      }
    })
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="mt-4">
          {/* Top Summary Cards */}
          <div className="row gap-2 d-flex mb-4 flex-wrap">
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
                <div className="col-lg-6 col-md-12 mb-4">
                  <div className="chart-card">
                    <Pie
                      data={pieMostStockedData}
                      options={pieMostStockedOptions}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-4">
                  <div className="chart-card">
                    <Doughnut
                      data={doughnutMostBeneficialData}
                      options={doughnutMostBeneficialOptions}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-4">
                  <div className="chart-card">
                    <Bar data={barMostStockItem} options={barMostStockOptions}/>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 mb-4">
                  <div className="chart-card">
                    <Bar
                      data={barFrequentlySoldData}
                      options={barFrequentlySoldOptions}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      )}
    </div>
  )
}

export default Dashboard;
