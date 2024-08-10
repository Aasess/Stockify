import express from 'express'
import { DashboardController } from '../controllers/index.js'

//middleware
// import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.use(authMiddleware)

//PROTECTED ROUTES
router.get('/most-beneficial-items', DashboardController.getMostBeneficialItems)
router.get(
  '/frequently-stocked-items',
  DashboardController.getFrequentlyStockedItems
)
router.get('/frequently-sold-items', DashboardController.getFrequentlySoldItems)
router.get(
  '/most-stocked-categories',
  DashboardController.getMostStockedCategories
)
router.get('/most-sold-categories', DashboardController.getMostSoldCategories)

export default router
