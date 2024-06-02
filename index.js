import express from 'express'
import dotenv from 'dotenv'

//DATABASE
import { connectDB } from './API/config/db.config.js'

//ROUTES
import { UserRoutes } from './API/routes/index.js'
import session from 'express-session'

//CORS
import cors from 'cors'

dotenv.config()

const app = express()

// Configure CORS
const corsOptions = {
  origin: 'https://stockify-smoky.vercel.app/',
  optionsSuccessStatus: 200, // For legacy browser support
}
app.use(cors(corsOptions))

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(
  session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
)

//DB CONN
connectDB()

//ROUTES
app.get('/', (req, res) => {
  res.send('Application is running!')
})

//LOAD ROUTES
app.use('/api/user', UserRoutes)

const listeningPort = process.env.PORT || 3050

app.listen(listeningPort, () => {
  console.log(`Application is running on port ${listeningPort}!`)
})
