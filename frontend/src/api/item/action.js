import { ItemEndPoint } from './endpoint'
import apiClient from '../apiClient'
import displayToast from '../../helpers/displayToast'

class ItemAction {
  static async findNumberOfItem() {
    try {
      const response = await apiClient.get(ItemEndPoint.count, {
        withCredentials: true, // Ensure credentials are included
      })
      return response.data?.data
    } catch (error) {
      throw error
    }
  }

  static async findAllItem() {
    try {
      const response = await apiClient.get(ItemEndPoint.item)
      return response.data?.data
    } catch (error) {
      throw error
    }
  }

  static async findItemById(id) {
    try {
      const response = await apiClient.get(
        ItemEndPoint.itemById.replace('id', id)
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async createNewItem(formData) {
    try {
      const response = await apiClient.post(ItemEndPoint.item, formData)
      displayToast(response.data.message, response.data.status)
      return response.data.status
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async updateItemById(id, formData) {
    try {
      const response = await apiClient.put(
        ItemEndPoint.itemById.replace('id', id),
        formData
      )
      displayToast(response.data.message, response.data.status)
      return response.data.status
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async deleteItemById(id) {
    try {
      const response = await apiClient.delete(
        ItemEndPoint.itemById.replace('id', id)
      )
      displayToast(response.data.message, response.data.status)
      return response.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }
}


export default ItemAction
