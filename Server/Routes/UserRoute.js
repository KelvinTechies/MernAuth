import express from 'express'
const router=express.Router()
import {AuthUser, RegisterUser, LogOutUser, GetUserProfile, UpdateUserProfile} from '../Controllers/UserController.js'
import {Protect} from '../Middleware/AuthMiddleware.js'
router.post('/', RegisterUser)
router.post('/auth', AuthUser)
router.post('/logout', LogOutUser)
router.route('/profile').get(Protect,GetUserProfile).put(Protect,UpdateUserProfile)
export default router;