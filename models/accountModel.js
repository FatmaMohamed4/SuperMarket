import mongoose from "mongoose";

const accountModel = new mongoose.Schema({
    orders:{ 
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Order'
        } ,
    
    address :{
        type :String
    } ,

    payment :{
        type :String
    } ,


})

const Account = mongoose.model('Account', accountModel);

export default Account;
