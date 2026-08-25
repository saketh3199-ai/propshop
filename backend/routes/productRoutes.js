import express from 'express'
const router = express.Router()
import { GetProductById,GetProducts,createProduct,updateProduct,deleteProduct,createProductReview,GetTopThreeProducts } from '../controllers/productController.js'
import { protect,admin } from '../middleware/authMiddleware.js'










router.get('/',GetProducts)
router.get('/top',GetTopThreeProducts)
router.get('/:id',GetProductById)
router.post('/',protect,admin,createProduct)
router.put('/:id',protect,admin,updateProduct)
router.delete('/:id',protect,admin,deleteProduct)
router.post('/:id/reviews',protect,createProductReview)



















































export default router