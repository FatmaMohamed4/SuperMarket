<<<<<<< HEAD
import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({

    product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
    }    

},{
    timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema)

=======
import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({

    product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
    }    

},{
    timestamps: true
});

const Photo = mongoose.model('Photo', photoSchema)

>>>>>>> 0ef84618eafe6293b6acaef03b2b7f60db094ded
export default Photo