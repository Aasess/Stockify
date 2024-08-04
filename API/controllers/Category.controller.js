import { CategoryServices } from '../services/index.js'

class CategoryController {
  static createCategory = async (req, res) => {
    try {
      const { category_name } = req.body

      if (!category_name) {
        throw new Error('All fields are required')
      }

      await CategoryServices.createCategory(category_name)
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
      const { category_name } = req.body

      if (!category_name) {
        throw new Error('All fields are required')
      }

      const result = await CategoryServices.updateCategoryById(id, category_name)
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

  static deleteCategoryById = async (req, res) => {
    try {
      const { id } = req.params

      const result = await CategoryServices.deleteCategoryById(id)
      if (result.affectedRows === 0) {
        res
          .status(404)
          .send({ status: 'failed', message: 'Category not found' })
      } else {
        res.status(200).send({ status: 'success', message: 'Category deleted' })
      }
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }

  static findAllCategoryDropDown = async (req, res) => {
    try {
      const categories = await CategoryServices.findAllDropDown()
      res.status(201).send({ status: 'success', data: categories })
    } catch (error) {
      res.status(400).send({ status: 'failed', message: error.message })
    }
  }
}

export default CategoryController
