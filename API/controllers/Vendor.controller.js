import { VendorServices } from '../services/index.js'

class VendorController {
  static createVendor = async (req, res) => {
    try {
      const { name, address, phone } = req.body

      if (!name || !address || !phone) {
        throw new Error('All fields are required')
      }

      await VendorServices.createVendor(name, address, phone)
      res.status(201).send({ status: 'success', message: 'New vendor added' })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findAllVendor = async (req, res) => {
    try {
      const vendors = await VendorServices.findAll()
      res.status(201).send({ status: 'success', data: vendors })
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
      const { name, address, phone } = req.body

      if (!name || !address || !phone) {
        throw new Error('All fields are required')
      }

      const updateData = { name, address, phone }

      const result = await VendorServices.updateVendorById(id, updateData)
      if (result.affectedRows === 0) {
        res.status(404).send({ status: 'failed', message: 'Vendor not found' })
      } else {
        res.status(200).send({ status: 'success', message: 'Vendor updated' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static deleteVendorById = async (req, res) => {
    try {
      const { id } = req.params

      const result = await VendorServices.deleteVendorById(id)
      if (result.affectedRows === 0) {
        res.status(404).send({ status: 'failed', message: 'Vendor not found' })
      } else {
        res.status(200).send({ status: 'success', message: 'Vendor deleted' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findAllVendorsDropDown = async (req, res) => {
    try {
      const vendors = await VendorServices.findAllDropDown()
      res.status(201).send({ status: 'success', data: vendors })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }
}

export default VendorController
