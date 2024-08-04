import { ItemServices, SaleServices, StockServices } from '../services/index.js'

class ItemController {
  static createItem = async (req, res) => {
    try {
      const { sku, item_name, category_id, vendor_id } = req.body

      if (!sku || !item_name || !category_id || !vendor_id) {
        throw new Error('All fields are required')
      }

      await ItemServices.createItem(req.body)

      res.status(201).send({ status: 'success', message: 'New item added' })
    } catch (error) {
      res.send({ status: 'failed', message: error.message })
    }
  }

  static findAllItems = async (req, res) => {
    try {
      const items = await ItemServices.getAllItems()
      res.status(201).send({ status: 'success', data: items })
    } catch (error) {
      res.send(400).send({ status: 'failed', message: error.message })
    }
  }

  static findItemById = async (req, res) => {
    try {
      const { id } = req.params
      const item = await ItemServices.getItemById(id)

      if (!item) {
        res.status(404).send({ status: 'failed', message: 'Item not found' })
      } else {
        res.status(200).send({ status: 'success', data: item })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static updateItemById = async (req, res) => {
    try {
      const { id } = req.params
      const { item_name, category_id, vendor_id } = req.body

      if (!item_name || !category_id || !vendor_id) {
        throw new Error('All fields are required')
      }

      const updateData = { item_name, category_id, vendor_id }

      const result = await ItemServices.updateItem(id, updateData)
      if (result.affectedRows === 0) {
        res.status(404).send({ status: 'failed', message: 'Item not found' })
      } else {
        res.status(200).send({ status: 'success', message: 'Item updated' })
      }
    } catch (error) {
      res.send({ status: 'failed', message: error.message })
    }
  }

  static deleteItemById = async (req, res) => {
    try {
      const { id } = req.params

      const item = await ItemServices.getItemById(id)
      if (item) {
        //now delete all the associated stock and sales too
        await StockServices.deleteAllItemsById(id)
        await SaleServices.deleteAllItemsById(id)
        const result = await ItemServices.deleteItem(id)

        res.status(200).send({ status: 'success', message: 'Item deleted' })
      } else {
        res.status(404).send({ status: 'failed', message: 'Item not found' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findCountOfItems = async (req, res) => {
    try {
      const count = await ItemServices.findCountOfAll()
      res.status(200).send({ status: 'success', data: count })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }
}

export default ItemController
