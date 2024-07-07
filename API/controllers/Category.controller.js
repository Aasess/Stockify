import { CategoryServices } from '../services/index.js'

class CategoryController {
  static createCategory = async (req, res) => {
    try {
      const { categoryName } = req.body

      if (!categoryName) {
        throw new Error('All fields are required')
      }

      await CategoryServices.createCategory(categoryName)
      res.status(201).send({ status: 'success', message: 'New category added' })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findAllCategory = async (req, res) => {
    try {
      const categories = await CategoryServices.findAll()
      res.status(201).send({ status: 'success', data: categories })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findCountOfAllCategories = async (req, res) => {
    try {
      const count = await CategoryServices.findCountOfAll()
      res.status(200).send({ status: 'success', data: count })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findCategoryById = async (req, res) => {
    try {
      const { id } = req.params
      const category = await CategoryServices.findById(id)
      if (!category) {
        res
          .status(404)
          .send({ status: 'failed', message: 'Category not found' })
      } else {
        res.status(200).send({ status: 'success', data: category })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static updateCategoryById = async (req, res) => {
    try {
      const { id } = req.params
      const { categoryName } = req.body

      if (!categoryName) {
        throw new Error('All fields are required')
      }

      const result = await CategoryServices.updateCategoryById(id, categoryName)
      if (result.affectedRows === 0) {
        res
          .status(404)
          .send({ status: 'failed', message: 'Category not found' })
      } else {
        res.status(200).send({ status: 'success', message: 'Category updated' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }
}

export default CategoryController
