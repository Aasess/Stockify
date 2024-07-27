import { connection } from '../config/db.config.js'

class StockModel {
  static findAll() {
    const sql = 'SELECT * FROM stock'
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
    const sql = 'SELECT * FROM stock WHERE id=?'
    return new Promise((resolve, reject) => {
      connection.query(sql, [id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static create(payload) {
    const { item_id, price, received_quantity, created_by } = payload

    const sql =
      'INSERT INTO stock (item_id, price, received_quantity, created_by) VALUES (?,?,?,?)'
    return new Promise((resolve, reject) => {
      connection.query(
        sql,
        [item_id, price, received_quantity, created_by],
        (error, result) => {
          if (error) {
            return reject(error)
          }
          resolve(result)
        }
      )
    })
  }

  static updateById(id, updateData) {
    const fields = []
    const values = []

    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = ?`)
      values.push(value)
    }

    const sql = `UPDATE stock SET ${fields.join(', ')} WHERE id = ?`
    values.push(id)

    return new Promise((resolve, reject) => {
      connection.query(sql, values, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static deleteById(id) {
    const sql = 'DELETE FROM stock WHERE id = ?'

    return new Promise((resolve, reject) => {
      connection.query(sql, [id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static findAllByItemId(id) {
    const sql = 'SELECT * FROM stock WHERE item_id = ?'

    return new Promise((resolve, reject) => {
      connection.query(sql, [id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static deleteAllItemsById(id) {
    const sql = 'DELETE FROM stock WHERE item_id = ?'

    return new Promise((resolve, reject) => {
      connection.query(sql, [id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static findTopStockItems() {
    const sql =
      'SELECT s.*, i.item_name FROM stock s JOIN item i ON s.item_id = i.id ORDER BY s.received_quantity DESC LIMIT 5'

    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }
}

export default StockModel
