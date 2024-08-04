import { StockServices } from '../services/index.js'

class StockController {
  static createStock = async (req, res) => {
    try {
      const { item_id, price, received_quantity } = req.body

      if (!item_id || !price || !received_quantity) {
        throw new Error('All fields are required')
      }

      await StockServices.createStock(req.body)
      await StockServices.calculateStock(item_id)
      res.status(201).send({ status: 'success', message: 'New stock added' })
    } catch (error) {
      res.send({ status: 'failed', message: error.message })
    }
  }

  static findAllStocks = async (req, res) => {
    try {
      const stocks = await StockServices.getAllStocks()
      res.status(200).send({ status: 'success', data: stocks })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findStockById = async (req, res) => {
    try {
      const { id } = req.params
      const stock = await StockServices.getStockById(id)

      if (!stock) {
        res.status(404).send({ status: 'failed', message: 'Stock not found' })
      } else {
        res.status(200).send({ status: 'success', data: stock })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static updateStockById = async (req, res) => {
    try {
      const { id } = req.params
      const { item_id, price, received_quantity } = req.body

      if (!item_id || !price || !received_quantity) {
        throw new Error('All fields are required')
      }

      const updateData = { item_id, price, received_quantity }

      const result = await StockServices.updateStock(id, updateData)
      if (result.affectedRows === 0) {
        res.status(404).send({ status: 'failed', message: 'Stock not found' })
      } else {
        await StockServices.calculateStock(item_id)
        res.status(200).send({ status: 'success', message: 'Stock updated' })
      }
    } catch (error) {
      res.send({ status: 'failed', message: error.message })
    }
  }

  static deleteStockById = async (req, res) => {
    try {
      const { id } = req.params

      const result = await StockServices.deleteStock(id)
      if (result.affectedRows === 0) {
        res.status(404).send({ status: 'failed', message: 'Stock not found' })
      } else {
        await StockServices.calculateStock(item_id)
        res.status(200).send({ status: 'success', message: 'Stock deleted' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findTopStockItems = async (req, res) => {
    try {
      const result = await StockServices.findTopStockItems()
      res.status(200).send({ status: 'success', data: result })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }
}

export default StockController
