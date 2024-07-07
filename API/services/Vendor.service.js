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

  static createVendor(vendor_name) {
    const sql = 'INSERT INTO vendor (vendor_name) VALUES (?)'
    return new Promise((resolve, reject) => {
      connection.query(sql, [vendor_name], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static updateVendorById(id, vendor_name) {
    const sql = 'UPDATE vendor SET vendor_name = ? WHERE id = ?'
    return new Promise((resolve, reject) => {
      connection.query(sql, [vendor_name, id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }
}

export default VendorServices
