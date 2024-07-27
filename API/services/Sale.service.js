import { SaleModel } from '../models/index.js'

class SaleServices {
  static async getAllSales() {
    try {
      const sales = await SaleModel.findAll()
      return sales
    } catch (error) {
      throw error
    }
  }

  static async getSaleById(id) {
    try {
      const sale = await SaleModel.findById(id)
      return sale
    } catch (error) {
      throw error
    }
  }

  static async createSale(payload) {
    try {
      const result = await SaleModel.create(payload)
      return result
    } catch (error) {
      throw error
    }
  }

  static async updateSale(id, updateData) {
    try {
      const result = await SaleModel.updateById(id, updateData)
      return result
    } catch (error) {
      throw error
    }
  }

  static async deleteSale(id) {
    try {
      const result = await SaleModel.deleteById(id)
      return result
    } catch (error) {
      throw error
    }
  }

  static async deleteAllItemsById(id) {
    try {
      const result = await SaleModel.deleteAllItemsById(id)
      return result
    } catch (error) {
      throw error
    }
  }
}

export default SaleServices
