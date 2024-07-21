<<<<<<< HEAD

import nodemailer from 'nodemailer'


export const sendToEmail=(email, otp) =>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: 'mail1project1@gmail.com', 
            pass: 'dedbgjcvpeimmrwl'
        }
    });

    // Email content
    const mailOptions = {
        from: 'mail1project1@gmail.com', 
        to: email, 
        subject: 'Your Reset Code  (OTP)', 
        text: `Your OTP is: ${otp}` 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    console.log(mailOptions)
=======

import nodemailer from 'nodemailer'


export const sendToEmail=(email, otp) =>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
            user: 'mail1project1@gmail.com', 
            pass: 'dedbgjcvpeimmrwl'
        }
    });

    // Email content
    const mailOptions = {
        from: 'mail1project1@gmail.com', 
        to: email, 
        subject: 'Your Reset Code  (OTP)', 
        text: `Your OTP is: ${otp}` 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
    console.log(mailOptions)
>>>>>>> 0ef84618eafe6293b6acaef03b2b7f60db094ded
}