import express from 'express'
import dotenv from 'dotenv'

//DATABASE
import { connectDB } from './API/config/connectDB.js'

dotenv.config()

const app = express()

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//DB CONN
connectDB()

//ROUTES
app.get('/', (req, res) => {
  res.send('Application is running!')
})

const listeningPort = process.env.PORT || 3050

app.listen(listeningPort, () => {
  console.log(`Application is running on port ${listeningPort}!`)
})
