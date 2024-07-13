import { StockModel, SaleModel, ItemModel } from '../models/index.js'

class StockServices {
  static async getAllStocks() {
    try {
      const stocks = await StockModel.findAll()
      return stocks
    } catch (error) {
      throw error
    }
  }

  static async getStockById(id) {
    try {
      const stock = await StockModel.findById(id)
      return stock
    } catch (error) {
      throw error
    }
  }

  static async createStock(payload) {
    try {
      const result = await StockModel.create(payload)
      return result
    } catch (error) {
      throw error
    }
  }

  static async updateStock(id, updateData) {
    try {
      const result = await StockModel.updateById(id, updateData)
      return result
    } catch (error) {
      throw error
    }
  }

  static async deleteStock(id) {
    try {
      const result = await StockModel.deleteById(id)
      return result
    } catch (error) {
      throw error
    }
  }

  static async calculateStock(itemId) {
    try {
      const soldItems = await SaleModel.findAllByItemId(itemId)
      const receivedItems = await StockModel.findAllByItemId(itemId)

      const soldQuantity = soldItems.reduce(
        (sum, sale) => sum + sale.sold_quantity,
        0
      )
      const receivedQuantity = receivedItems.reduce(
        (sum, stock) => sum + stock.received_quantity,
        0
      )

      if (receivedQuantity < soldQuantity) {
        throw new Error(
          'Sold quantity cannot be greater than received quantity'
        )
      }

      const remainingQuantity = receivedQuantity - soldQuantity
      const isStock = remainingQuantity > 0

      await ItemModel.updateById(itemId, {
        remaining_quantity: remainingQuantity,
        is_stock: isStock,
      })
    } catch (error) {
      throw new Error(
        `Error calculating stock for item ${itemId}: ${error.message}`
      )
    }
  }
}

export default StockServices
