import apiClient from '../apiClient'
import displayToast from '../../helpers/displayToast'
import { DashboardEndPoint } from './endpoint'

class DashboardAction {
  static async getMostBeneficialItems() {
    try {
      const response = await apiClient.get(DashboardEndPoint.mostBenificalItems)
      return response.data?.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async getFrequentlySoldItems() {
    try {
      const response = await apiClient.get(
        DashboardEndPoint.frequentlySoldItems
      )
      return response.data?.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async getMostStockedCategories() {
    try {
      const response = await apiClient.get(
        DashboardEndPoint.mostStockedCategories
      )
      return response.data?.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async getMostSoldCategories() {
    try {
      const response = await apiClient.get(DashboardEndPoint.mostSoldCategories)
      return response.data?.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }
}

export default DashboardAction
