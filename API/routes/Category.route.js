import express from 'express'
import { CategoryController } from '../controllers/index.js'

//middleware
// import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.use(authMiddleware)

//PROTECTED ROUTES
router.get('/', CategoryController.findAllCategory)
router.post('/', CategoryController.createCategory)
router.get('/count', CategoryController.findCountOfAllCategories)
router.get('/:id', CategoryController.findCategoryById)
router.put('/:id', CategoryController.updateCategoryById)

export default router
