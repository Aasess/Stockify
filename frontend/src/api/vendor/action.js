import axios from 'axios'
import { VendorEndPoint } from './endpoint'
import apiClient from '../apiClient'

class VendorAction {
  static async findNumberOfVendor() {
    try {
      const response = await apiClient.get(VendorEndPoint.count)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async findAllVendor() {
    try {
      const response = await apiClient.get(VendorEndPoint.vendor)
      return response.data
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
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async updateVendorById(id, formData) {
    try {
      const response = await apiClient.put(
        VendorEndPoint.vendorById.replace('id', id),
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default VendorAction
