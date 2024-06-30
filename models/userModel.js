
import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'
import generateOTP from 'otp-generator';
import crypto from 'crypto' 
import validator from 'validator';
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "Username is required"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            validate: [validator.isEmail, "This is not a valid Email"],
        } ,

        password :{
            type: String,
            required: [true, "password is required"],
            minlength: [6, "Password must be at least 6 characters"]
        } ,

        // confirmPassword :{
        //     type: String,
        //     required: [true, "Confirm Password is required"],
        //     validate: {
        //         validator: function (el) {
        //             return el === this.password;
        //         },
        //         message: 'Passwords are not the same',
        //     },
        // } ,

        otp: {
        type: String
       },

       otpExpires: {
        type: Date
       }
    },
);

userSchema.pre('save', async function (next) { 
    //only run if password modified
    if (!this.isModified('password')) {
        return next();
    }

    this.password = await bcryptjs.hash(this.password, 12);
    this.confirmPassword = undefined;

    next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcryptjs.compare(candidatePassword, userPassword);
  };

  userSchema.methods.generateOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    this.otp = otp;
    this.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes
    return otp;
};
const User = mongoose.model('User', userSchema);

export default User;