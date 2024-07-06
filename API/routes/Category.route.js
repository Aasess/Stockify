import express from 'express'
import CategoryController from './controllers/index.js'

//middleware
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

//PROTECTED ROUTES
router.post('/categories', CategoryController.createCategory)
router.get('/categories', CategoryController.findAllCategory)
router.get('/categories/count', CategoryController.findCountOfAllCategories)
router.get('/categories/:id', CategoryController.findCategoryById)
router.put('/categories/:id', CategoryController.updateCategoryById)

export default router
