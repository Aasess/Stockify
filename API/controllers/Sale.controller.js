import { SaleServices } from '../services/index.js'

class SaleController {
  static createSale = async (req, res) => {
    try {
      const { item_id, price, sold_quantity } = req.body

      if (!item_id || !price || !sold_quantity) {
        throw new Error('All fields are required')
      }

      const sale = await SaleServices.createSale(req.body)
      await StockService.calculateStock(sale.item_id)
      res.status(201).send({ status: 'success', message: 'New sale added' })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findAllSales = async (req, res) => {
    try {
      const sales = await SaleServices.getAllSales()
      res.status(200).send({ status: 'success', data: sales })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findSaleById = async (req, res) => {
    try {
      const { id } = req.params
      const sale = await SaleServices.getSaleById(id)

      if (!sale) {
        res.status(404).send({ status: 'failed', message: 'Sale not found' })
      } else {
        res.status(200).send({ status: 'success', data: sale })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static updateSaleById = async (req, res) => {
    try {
      const { id } = req.params
      const { item_id, price, sold_quantity } = req.body

      if (!item_id || !price || !sold_quantity) {
        throw new Error('All fields are required')
      }

      const updateData = { item_id, price, sold_quantity, created_by }

      const result = await SaleServices.updateSale(id, updateData)
      if (result.affectedRows === 0) {
        res.status(404).send({ status: 'failed', message: 'Sale not found' })
      } else {
        await StockService.calculateStock(result.item_id)
        res.status(200).send({ status: 'success', message: 'Sale updated' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static deleteSaleById = async (req, res) => {
    try {
      const { id } = req.params

      const result = await SaleServices.deleteSale(id)
      if (result.affectedRows === 0) {
        res.status(404).send({ status: 'failed', message: 'Sale not found' })
      } else {
        await StockService.calculateStock(result.item_id)
        res.status(200).send({ status: 'success', message: 'Sale deleted' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }
}

export default SaleController
