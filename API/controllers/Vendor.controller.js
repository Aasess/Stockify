import { VendorServices } from '../services/index.js'

class VendorController {
  static createVendor = async (req, res) => {
    try {
      const { vendorName } = req.body

      if (!vendorName) {
        throw new Error('All fields are required')
      }

      await VendorServices.createVendor(vendorName)
      res.status(201).send({ status: 'success', message: 'New vendor added' })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findAllVendor = async (req, res) => {
    try {
      const categories = await VendorServices.findAll()
      res.status(201).send({ status: 'success', data: categories })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findCountOfAllCategories = async (req, res) => {
    try {
      const count = await VendorServices.findCountOfAll()
      res.status(200).send({ status: 'success', data: count })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findVendorById = async (req, res) => {
    try {
      const { id } = req.params
      const vendor = await VendorServices.findById(id)
      if (!vendor) {
        res.status(404).send({ status: 'failed', message: 'Vendor not found' })
      } else {
        res.status(200).send({ status: 'success', data: vendor })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static updateVendorById = async (req, res) => {
    try {
      const { id } = req.params
      const { vendorName } = req.body

      if (!vendorName) {
        throw new Error('All fields are required')
      }

      const result = await VendorServices.updateVendorById(id, vendorName)
      if (result.affectedRows === 0) {
        res.status(404).send({ status: 'failed', message: 'Vendor not found' })
      } else {
        res.status(200).send({ status: 'success', message: 'Vendor updated' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }
}

export default VendorController
