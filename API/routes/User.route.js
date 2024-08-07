import express from 'express'
import { UserController } from '../controllers/index.js'

//middleware
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Route level middleware - to Protect routes
router.use('/change-password', authMiddleware)
// router.use('/detail', authMiddleware)

//PUBLIC ROUTES
router.post('/register', UserController.userRegistration)
router.post('/login', UserController.userLogin)
router.post('/send-reset-password-email', UserController.sendPasswordResetEmail)
router.post('/reset-password/:id', UserController.resetUserPassword)

//Protected Routes
router.get('/detail/:id', UserController.isUserLoggedIn)
router.post('/change-password', UserController.changeUserPassword)

export default router
