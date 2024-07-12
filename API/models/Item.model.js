import { connection } from '../config/db.config'

class ItemModel {
  static findAll() {
    const sql = 'SELECT * FROM item'
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
    const sql = 'SELECT * FROM item WHERE id=?'
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
    const { sku, item_name, category_id, vendor_id } = payload

    const sql =
      'INSERT INTO item (sku, item_name, category_id, vendor_id) VALUES (?,?,?,?)'
    return new Promise((resolve, reject) => {
      connection.query(
        sql,
        [sku, item_name, category_id, vendor_id],
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

    const sql = `UPDATE item SET ${fields.join(', ')} WHERE id = ?`
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
    const sql = 'DELETE FROM item WHERE id = ?'

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

export default ItemModel
