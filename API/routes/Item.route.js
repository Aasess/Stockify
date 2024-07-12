import express from 'express'
import { ItemController } from '../controllers/index.js'

//middleware
// import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.use(authMiddleware)

//PROTECTED ROUTES
router.get('/', ItemController.findAllItems)
router.post('/', ItemController.createItem)
router.get('/:id', ItemController.findItemById)
router.put('/:id', ItemController.updateItemById)
router.delete('/:id', ItemController.deleteItemById)

export default router
