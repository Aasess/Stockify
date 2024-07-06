import express from 'express'
import { VendorController } from '../controllers/index.js'

//middleware
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(authMiddleware)

//PROTECTED ROUTES
router.get('/vendor', VendorController.findAllVendor)
router.post('/vendor', VendorController.createVendor)
router.get('/vendor/count', VendorController.findCountOfAllCategories)
router.get('/vendor/:id', VendorController.findVendorById)
router.put('/vendor/:id', VendorController.updateVendorById)

export default router
