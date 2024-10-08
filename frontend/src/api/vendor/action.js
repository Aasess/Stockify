import { VendorEndPoint } from './endpoint'
import apiClient from '../apiClient'
import displayToast from '../../helpers/displayToast'

class VendorAction {
  static async findNumberOfVendor() {
    try {
      const response = await apiClient.get(VendorEndPoint.count)
      return response.data?.data
    } catch (error) {
      throw error
    }
  }

  static async findAllVendor() {
    try {
      const response = await apiClient.get(VendorEndPoint.vendor)
      return response.data?.data
    } catch (error) {
      throw error
    }
  }

  static async findAllVendorsDropDown() {
    try {
      const response = await apiClient.get(VendorEndPoint.dropDown)
      return response.data?.data
    } catch (error) {
      throw error
    }
  }

  static async findVendorById(id) {
    try {
      const response = await apiClient.get(
        VendorEndPoint.vendorById.replace('id', id)
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async createNewVendor(formData) {
    try {
      const response = await apiClient.post(VendorEndPoint.vendor, formData)
      displayToast(response.data.message, response.data.status)
      return response.data.status
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async updateVendorById(id, formData) {
    try {
      const response = await apiClient.put(
        VendorEndPoint.vendorById.replace('id', id),
        formData
      )
      displayToast(response.data.message, response.data.status)
      return response.data.status
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }

  static async deleteVendorById(id) {
    try {
      const response = await apiClient.delete(
        VendorEndPoint.vendorById.replace('id', id)
      )
      displayToast(response.data.message, response.data.status)
      return response.data
    } catch (error) {
      displayToast(error.message, 'error')
      throw error
    }
  }
}

export default VendorAction
