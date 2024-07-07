import { connection } from '../config/db.config.js'

class VendorServices {
  static findAll() {
    const sql = 'SELECT * FROM vendor'
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
    const sql = 'SELECT COUNT(*) AS Count FROM vendor'
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
    const sql = 'SELECT * FROM vendor WHERE id = ?'
    return new Promise((resolve, reject) => {
      connection.query(sql, [id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static createVendor(name, address, phone) {
    const sql = 'INSERT INTO vendor (name, address, phone) VALUES (?,?,?)'
    return new Promise((resolve, reject) => {
      connection.query(sql, [name, address, phone], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static updateVendorById(id, updateData) {
    const fields = []
    const values = []

    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = ?`)
      values.push(value)
    }

    const sql = `UPDATE vendor SET ${fields.join(', ')} WHERE id = ?`
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

  static deleteVendorById(id) {
    const sql = 'DELETE FROM vendor WHERE id = ?'

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

export default VendorServices
