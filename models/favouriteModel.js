<<<<<<< HEAD
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
=======
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
>>>>>>> 0ef84618eafe6293b6acaef03b2b7f60db094ded
export default Fav