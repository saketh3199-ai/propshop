import express from 'express'
const router = express.Router()
import { protect,admin } from '../middleware/authMiddleware.js'
import { addOrderItems,getMyOrders,getOrderById,updateOrderToPaid,updateOrderToDelivered,getOrders } from '../controllers/orderController.js'


//api url : /api/orders/
router.post('/',protect,addOrderItems)

//api url : /api/orders/
router.get('/',protect,admin,getOrders)

//api url : /api/orders/mine
router.get('/mine',protect,getMyOrders)

//api url : /api/orders/:id
router.get('/:id',protect,getOrderById)

//api url : /api/orders/:id/pay
router.put('/:id/pay',protect,updateOrderToPaid)

//api url : /api/orders/:id/deliver
router.put('/:id/deliver',protect,admin,updateOrderToDelivered)


export default router