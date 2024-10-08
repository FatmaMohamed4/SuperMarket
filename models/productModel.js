import mongoose, { model } from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema (
    {
      productName :{
        type : String ,
        // required : [true , "Product Name is required"]   
      } , 

      bestSelling :{
        type :String ,
        default:false ,
        requiured :true
      } ,
      
      slug: {
      type: String,
      unique: true,
      },

      price: {
        type: Number,
        required: [true, "Product Price is required"],
        validate: {
           validator: function(v) {
            return v >= 0; // Ensures the price is not negative
       },
         message : 'not valid value '
    }
      } ,

      stock :{
        type: Number
      } ,

     quantity:{
        type: Number ,
        default : 1
      } ,

      photo :{
        type : String
      } ,

      productDetail :{
        type : String ,
        required: [true, "Product Detail is required"],
      } ,
      
      rate: {
        type: Number,
        enum: [0, 1, 1.5 , 2 ,2.5 , 3 , 3.5 , 4, 4.5, 5 ], 
        // required: [true, "Rate is required"],
        default : 0
      }, 

      categoryName :{
        type: String , 
        ref :"Category" ,
        required : true
      } ,
          
    },
    { timestamps: true }
);

// Middleware to create or update the slug field
productSchema.pre("save", function (next) {
  if (!this.isModified("productName")) {
    return next();
  }
  this.slug = slugify(this.productName, { lower: true });
  next();
});
const Product = mongoose.model('Product', productSchema);

export default Product;