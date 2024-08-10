import { DashboardServices } from '../services/index.js'

class DashboardController {
  static getMostBeneficialItems = async (req, res) => {
    try {
      const items = await DashboardServices.getMostBeneficialItems()
      res.status(200).send({ status: 'success', data: items })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static getFrequentlyStockedItems = async (req, res) => {
    try {
      const items = await DashboardServices.getFrequentlyStockedItems()
      res.status(200).send({ status: 'success', data: items })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static getFrequentlySoldItems = async (req, res) => {
    try {
      const items = await DashboardServices.getFrequentlySoldItems()
      res.status(200).send({ status: 'success', data: items })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static getMostStockedCategories = async (req, res) => {
    try {
      const categories = await DashboardServices.getMostStockedCategories()
      res.status(200).send({ status: 'success', data: categories })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static getMostSoldCategories = async (req, res) => {
    try {
      const categories = await DashboardServices.getMostSoldCategories()
      res.status(200).send({ status: 'success', data: categories })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }
}

export default DashboardController
