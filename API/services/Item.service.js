import { ItemModel } from '../models/index.js'

class ItemServices {
  static async getAllItems() {
    try {
      const items = await ItemModel.findAll()
      return items
    } catch (error) {
      throw error
    }
  }

  static async getItemById(id) {
    try {
      const item = await ItemModel.findById(id)
      return item
    } catch (error) {
      throw error
    }
  }

  static async createItem(payload) {
    try {
      const result = await ItemModel.create(payload)
      return result
    } catch (error) {
      throw error
    }
  }

  static async updateItem(id, updateData) {
    try {
      const result = await ItemModel.updateById(id, updateData)
      return result
    } catch (error) {
      throw error
    }
  }

  static async deleteItem(id) {
    try {
      const result = await ItemModel.deleteById(id)
      return result
    } catch (error) {
      throw error
    }
  }

  static async findCountOfAll(id) {
    try {
      const result = await ItemModel.findCountOfAll(id)
      return result
    } catch (error) {
      throw error
    }
  }
}

export default ItemServices
