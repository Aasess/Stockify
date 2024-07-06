import { connection } from '../config/db.config.js'

class UserServices {
  static findAll() {
    const sql = 'SELECT * FROM user'
    return new Promise((resolve, reject) => {
      connection.query(sql, (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }

  static findByEmail(email) {
    const sql = 'SELECT * FROM user WHERE email = ?'
    return new Promise((resolve, reject) => {
      connection.query(sql, [email], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result[0]) // Assuming email is unique
      })
    })
  }

  static findByUsername(username) {
    const sql = 'SELECT * FROM user WHERE username = ?'
    return new Promise((resolve, reject) => {
      connection.query(sql, [username], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result[0]) // Assuming username is unique
      })
    })
  }

  static createUser(username, email, hashedPassword) {
    const sql = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)'
    return new Promise((resolve, reject) => {
      connection.query(
        sql,
        [username, email, hashedPassword],
        (error, result) => {
          if (error) {
            return reject(error)
          }
          resolve(result)
        }
      )
    })
  }

  static updatePassword(id, password) {
    const sql = 'UPDATE user SET password=? WHERE id=?'
    return new Promise((resolve, reject) => {
      connection.query(sql, [password, id], (error, result) => {
        if (error) {
          return reject(error)
        }
        resolve(result)
      })
    })
  }
}

export default UserServices
