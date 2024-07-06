import express from 'express'
import { UserController } from '../controllers/index.js'

const router = express.Router()

//PUBLIC ROUTES
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.resetUserPassword)

//Protected Routes
router.post('/change-password', UserController.changeUserPassword)

export default router
