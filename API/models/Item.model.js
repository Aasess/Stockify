import { connection } from '../config/db.config.js'

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

  static findCountOfAll() {
    const sql1 = 'SELECT COUNT(*) AS CountTotal FROM item'
    const sql2 = 'SELECT Count(*) AS CountOutStock FROM item WHERE is_stock=0'

    return new Promise((resolve, reject) => {
      connection.query(sql1, (error, count) => {
        if (error) {
          return reject(error)
        }

        connection.query(sql2, (error, countOutOfStockResult) => {
          if (error) {
            return reject(error)
          }

          resolve({
            allRecords: count?.[0].CountTotal,
            outOfStockCount: countOutOfStockResult[0].CountOutStock,
          })
        })
      })
    })
  }
}

export default ItemModel
