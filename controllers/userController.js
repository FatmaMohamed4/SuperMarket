import User from "../models/userModel.js"
// import asyncHandler from 'express-async-handler';
import Jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import crypto from'crypto'
import catchError from "../middlewares/catchError.js";
import AppError from "../middlewares/AppError.js";
import { sendToEmail } from "../utils/Email.js";
// import sendToEmail from "../utils/Email.js";
dotenv.config({path:'./config.env'})
dotenv.config();
const SECRET_Key = process.env.SECRET_Key; 

  export const register = catchError(async (req,res  , next)=>{
      const email = req.body.email
        const user=await User.findOne({email})
        if(!user){
           consr newUser = await User.create(req.body)
            res.status(201).json({
                status : true , 
                message :"Register correctly" , newUser : newUser
            })
        } else{
          return next(new AppError('Invalid Email or password', 400) )
        }
    })

  export const LogIn =catchError(async(req,res , next)=>{
      const email = req.body.email
        const password = req.body.password 
        const user = await User.findOne({ email })

        if (!user || !(await user.correctPassword(password, user.password))) {
          return next(new AppError('Invalid Email or password ', 400) )
          }
     
        let token = Jwt.sign({ userId: user._id }, SECRET_Key, { expiresIn: "30d" });

            res.status(200).json({
                status : true , 
                message :`Welcom Again ${user.userName}` ,
                token :token
            }) 
    })

  export const userInfo =catchError(async(req,res,next)=>{
    const id = req.body.id 
    const user = await User.findById(id)

    if (!user) {
      return next(new AppError('User not found ', 404) )
      }

      res.status(200).json({
        status : true , 
        user
    }) 

  })



  export const forgotPassword = catchError(async (req, res,next) => {   
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('Invalid email',401))
    }

    const otp = user.generateOTP();
    await user.save({ validateBeforeSave: false });
    sendToEmail(req.body.email, otp);

    res.status(200).json({
        status: true,
        message: "OTP generated and sent to your email"
    }); 
})
const SECRET_KEY = process.env.SECRET_KEY;

export const verifyOTP = catchError(async (req, res, next) => {
  const otp = req.body.otp;
  const user = await User.findOne({
      otp: otp,
      otpExpires: { $gt: Date.now() }
  });

  if (!user) {
      return next(new AppError('Invalid or expired OTP', 400));
  }

  const token = Jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "90d" });

  res.status(200).json({
      status: true,
      message: "Confirmed OTP",
      token
  });
});

export const resetPassword = async (req, res) => {

  try {
    const user =req.user;
    user.password=req.body.password
   
    user.otp=undefined ; 
    user.otpExpires=undefined ;
    user.save({validateBeforeSave:true})
    res.status(200).json({
      status:true,
      message : "update password correctly"
      // user
    })
  } catch (error) {
      console.error('Error in resetPassword:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};
