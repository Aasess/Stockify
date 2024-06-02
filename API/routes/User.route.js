import express from 'express'
import { UserController } from '../controllers/index.js'

const router = express.Router()

//PUBLIC ROUTES
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)

export default router
