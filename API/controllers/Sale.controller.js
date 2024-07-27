import { StockServices, SaleServices, ItemServices } from '../services/index.js'

class SaleController {
  static createSale = async (req, res) => {
    try {
      const { item_id, price, sold_quantity } = req.body

      if (!item_id || !price || !sold_quantity) {
        throw new Error('All fields are required')
      }
      const foundItem = await ItemServices.getItemById(item_id)
      if (foundItem) {
        const { remaining_quantity } = foundItem[0]

        if (remaining_quantity >= sold_quantity) {
          await SaleServices.createSale(req.body)
          await StockServices.calculateStock(item_id)
          return res
            .status(201)
            .send({ status: 'success', message: 'New sale added' })
        }
        return res.status(400).send({
          status: 'failed',
          message: 'Sold quantity cannot be greater than remaining quantity',
        })
      }
      return res
        .status(400)
        .send({ status: 'failed', message: 'Item not found' })
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

      const foundItem = await ItemServices.getItemById(item_id)
      if (foundItem) {
        const { remaining_quantity } = foundItem[0]

        if (remaining_quantity >= sold_quantity) {
          const updateData = { item_id, price, sold_quantity }

          const result = await SaleServices.updateSale(id, updateData)
          if (result.affectedRows === 0) {
            return res
              .status(404)
              .send({ status: 'failed', message: 'Sale not found' })
          } else {
            await StockServices.calculateStock(item_id)
            return res
              .status(200)
              .send({ status: 'success', message: 'Sale updated' })
          }
        }
        return res.status(400).send({
          status: 'failed',
          message: 'Sold quantity cannot be greater than remaining quantity',
        })
      }
      return res
        .status(400)
        .send({ status: 'failed', message: 'Item not found' })
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
        await StockServices.calculateStock(id)
        res.status(200).send({ status: 'success', message: 'Sale deleted' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }
}

export default SaleController
