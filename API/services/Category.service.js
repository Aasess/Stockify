import { connection } from '../config/db.config.js'

class CategoryServices {
  static findAll() {
    const sql = 'SELECT * FROM category'
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static findCountOfAll() {
    const sql = 'SELECT COUNT(*) AS Count FROM category'
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static findById(id) {
    const sql = 'SELECT * FROM category WHERE id = ?'
    return new Promise((resolve, reject) => {
      connection.query(sql, [id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static createCategory(category_name) {
    const sql = 'INSERT INTO category (category_name) VALUES (?)'
    return new Promise((resolve, reject) => {
      connection.query(sql, [category_name], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static updateCategoryById(id, category_name) {
    const sql = 'UPDATE category SET category_name = ? WHERE id = ?'
    return new Promise((resolve, reject) => {
      connection.query(sql, [category_name, id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static deleteCategoryById(id) {
    const sql = 'DELETE FROM category WHERE id = ?'

    return new Promise((resolve, reject) => {
      connection.query(sql, [id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }
}

export default CategoryServices
