import { StockEndPoint } from './endpoint'; // Adjust path as needed
import apiClient from '../apiClient'; // Adjust path as needed
import displayToast from '../../helpers/displayToast'

class StockAction {
  static async findAllStocks() {
    try {
      const response = await apiClient.get(StockEndPoint.stocks)
      return response.data?.data
    } catch (error) {
      throw error
    }
  }

  static async findStockById(id) {
    try {
      const response = await apiClient.get(
        StockEndPoint.stockById.replace('id', id)
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async createNewStock(formData) {
    try {
      const response = await apiClient.post(StockEndPoint.stocks, formData)
      displayToast(response.data.message, response.data.status)
      return response.data.status
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async updateStockById(id, formData) {
    try {
      const response = await apiClient.put(
        StockEndPoint.stockById.replace('id', id),
        formData
      )
      displayToast(response.data.message, response.data.status)
      return response.data.status
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async deleteStockById(id) {
    try {
      const response = await apiClient.delete(
        StockEndPoint.stockById.replace('id', id)
      )
      displayToast(response.data.message, response.data.status)
      return response.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async findTopStockItems() {
    try {
      const response = await apiClient.get(StockEndPoint.most)
      return response.data?.data
    } catch (error) {
      throw error
    }
  }
}

export default StockAction;
