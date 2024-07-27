import express from 'express'
import { StockController } from '../controllers/index.js'

//middleware
// import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.use(authMiddleware)

//PROTECTED ROUTES
router.get('/', StockController.findAllStocks)
router.post('/', StockController.createStock)
router.get('/most-stock', StockController.findTopStockItems)
router.get('/:id', StockController.findStockById)
router.put('/:id', StockController.updateStockById)
router.delete('/:id', StockController.deleteStockById)

export default router
