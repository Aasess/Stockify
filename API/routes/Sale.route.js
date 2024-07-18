import express from 'express'
import { SaleController } from '../controllers/index.js'

//middleware
// import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.use(authMiddleware)

//PROTECTED ROUTES
router.get('/', SaleController.findAllSales)
router.post('/', SaleController.createSale)
router.get('/:id', SaleController.findSaleById)
router.put('/:id', SaleController.updateSaleById)
router.delete('/:id', SaleController.deleteSaleById)

export default router
