import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        // required: true
}] ,
   user :{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
   }

} ,
{
    timestamps :true
})

const Fav = mongoose.model('favorite', favSchema);
export default Fav