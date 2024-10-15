import express  from "express";
import {registerController, LoginController, testController, ForgetpasswordController, UpdateProfileController, getOrdersController, getAllOrderController, ordersStatusController} from '../controllers/AuthController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import Usermodel from "../Models/Usermodel.js";
//router object
const router = express.Router()
//routing
//Register || Method Post
router.post('/register', registerController)

//Login || Method POST

router.post('/Login', LoginController)

// test controller 
router.get('/test',requireSignIn,isAdmin,   testController)
//Forgetpassword
router.post('/forget-password',ForgetpasswordController)
//protected  user auth route
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({
        ok: true,
    })
})
//protected admin auth route
router.get('/admin-auth', requireSignIn,isAdmin, (req,res)=>{
    res.status(200).send({
        ok: true,
    })
})
//Update Profile route
router.put('/profile',requireSignIn, UpdateProfileController)
//getting Order Controller
router.get('/orders', requireSignIn, getOrdersController)
//getting admin all orders controller
router.get('/all-orders', requireSignIn,isAdmin, getAllOrderController)
//order status update
router.put('/order-status/:orderId', requireSignIn, isAdmin, ordersStatusController)
export default router;