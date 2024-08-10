import express from 'express'
import dotenv from 'dotenv'

//DATABASE
import { connectDB } from './API/config/db.config.js'

//ROUTES
import {
  CategoryRoutes,
  UserRoutes,
  VendorRoutes,
  ItemRoutes,
  StockRoutes,
  SaleRoutes,
  DashboardRoutes,
} from './API/routes/index.js'

import session from 'express-session'

//CORS
import cors from 'cors'

dotenv.config()

const app = express()

let corsOptions = {}

if (process.env.NODE_ENV === 'development') {
  // Configure CORS
  corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies)
  }
} else {
  // Configure CORS
  corsOptions = {
    origin: 'https://stockify-smoky.vercel.app',
    credentials: true, // Allow credentials (cookies)
  }
}

app.use(cors(corsOptions))

//MIDDLEWARES
app.use(
  session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'development' ? false : true,
      httpOnly: true, // ensures the cookie is sent only over HTTP(S), not client JavaScript, helps protect against cross-site scripting attacks
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax', // necessary to allow cross-origin requests in production
    },
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//DB CONN
connectDB()

//ROUTES
app.get('/', (req, res) => {
  res.send('Application is running!')
})

//LOAD ROUTES
app.use('/api/user', UserRoutes)
app.use('/api/category', CategoryRoutes)
app.use('/api/vendor', VendorRoutes)
app.use('/api/item', ItemRoutes)
app.use('/api/stock', StockRoutes)
app.use('/api/sale', SaleRoutes)
app.use('/api/dashboard', DashboardRoutes)

const listeningPort = process.env.PORT || 3050

app.listen(listeningPort, () => {
  console.log(`Application is running on port ${listeningPort}!`)
})
