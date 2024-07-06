import axios from 'axios'
import { CategoryEndPoint } from './endpoint'

class CategoryAction {
  static async findNumberOfCategory() {
    try {
      const response = await axios.get(CategoryEndPoint.count)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async findAllCategory() {
    try {
      const response = await axios.get(CategoryEndPoint.category)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async findCategoryById(id) {
    try {
      const response = await axios.get(
        CategoryEndPoint.categoryById.replace('id', id)
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async createNewCategory(formData) {
    try {
      const response = await axios.post(CategoryEndPoint.category, formData)
      return response.data
    } catch (error) {
      throw error
    }
  }

  static async updateCategoryById(id, formData) {
    try {
      const response = await axios.put(
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
