import express from 'express'
const router = express.Router()
import {loginUser,registerUser,logoutUser,getUserProfile,updateUserProfile,getUsers,deleteUser,getUserById,updateUser} from '../controllers/userController.js'
import { protect,admin } from '../middleware/authMiddleware.js'

// router.route('/').post(registerUser).get(getUsers)
router.post('/',registerUser)
router.get('/',protect,admin,getUsers)
router.post('/logout',logoutUser)
router.post('/login',loginUser)
// router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.get('/profile',protect,getUserProfile)
router.put('/profile',protect,updateUserProfile)
//admin routes
router.get('/:id',protect,admin,getUserById)
router.put('/:id',protect,admin,updateUser)
router.delete('/:id',protect,admin,deleteUser)
export default router