import express from "express"
import  { LogIn, forgotPassword, register, resetPassword, userInfo, verifyOTP } from "../controllers/userController.js";
import protect from './../utils/protect.js';
import { getOrders_ofUser } from "../controllers/orderController.js";

const userRoute = express.Router();


userRoute.post('/register',register)
userRoute.post('/login',LogIn)
userRoute.get('/info',userInfo)

userRoute.post('/sendCode', forgotPassword);
userRoute.patch('/reset' ,protect,resetPassword)
userRoute.post('/verify',verifyOTP)
userRoute.get('/orders',protect,getOrders_ofUser)
export default userRoute