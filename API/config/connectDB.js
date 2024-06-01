import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
})

export const connectDB = async () => {
  await connection.connect((err) => {
    if (err) {
      return console.log('error:', err.message)
    }
    console.log('Connected to the MYSQL server')
  })
}
