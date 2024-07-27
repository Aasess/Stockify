import { connection } from '../config/db.config.js'

class SaleModel {
  static findAll() {
    const sql = 'SELECT * FROM sale'
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
    const sql = 'SELECT * FROM sale WHERE id=?'
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
    const { item_id, price, sold_quantity, created_by } = payload

    const sql =
      'INSERT INTO sale (item_id, price, sold_quantity, created_by) VALUES (?,?,?,?)'
    return new Promise((resolve, reject) => {
      connection.query(
        sql,
        [item_id, price, sold_quantity, created_by],
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

    const sql = `UPDATE sale SET ${fields.join(', ')} WHERE id = ?`
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
    const sql = 'DELETE FROM sale WHERE id = ?'

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
    const sql = 'SELECT * FROM sale where item_id = ?'

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
    const sql = 'DELETE FROM sale WHERE item_id = ?'

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

export default SaleModel
