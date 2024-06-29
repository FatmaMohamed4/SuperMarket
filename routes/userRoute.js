import express from "express"
import  { LogIn, register, userInfo } from "../controllers/userController.js";

const userRoute = express.Router();


userRoute.post('/register',register)
userRoute.post('/login',LogIn)
userRoute.get('/info',userInfo)
export default userRoute