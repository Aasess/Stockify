import express from 'express'
import { VendorController } from '../controllers/index.js'

//middleware
// import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

// router.use(authMiddleware)

//PROTECTED ROUTES
router.get('/', VendorController.findAllVendor)
router.post('/', VendorController.createVendor)
router.get('/count', VendorController.findCountOfAllCategories)
router.get('/:id', VendorController.findVendorById)
router.put('/:id', VendorController.updateVendorById)

export default router
