import axios from 'axios'
import { CategoryEndPoint } from './endpoint'
import apiClient from '../apiClient'

class CategoryAction {
  static async findNumberOfCategory() {
    try {
      const response = await apiClient.get(CategoryEndPoint.count, {
        withCredentials: true, // Ensure credentials are included
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async findAllCategory() {
    try {
      const response = await apiClient.get(CategoryEndPoint.category)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async findCategoryById(id) {
    try {
      const response = await apiClient.get(
        CategoryEndPoint.categoryById.replace('id', id)
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async createNewCategory(formData) {
    try {
      const response = await apiClient.post(CategoryEndPoint.category, formData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async updateCategoryById(id, formData) {
    try {
      const response = await apiClient.put(
        CategoryEndPoint.categoryById.replace('id', id),
        formData
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default CategoryAction
