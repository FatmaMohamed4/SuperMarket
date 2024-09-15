import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Fav from "../models/favouriteModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";



export const addToFav = catchError(async (req, res, next) => {
    const user = req.user._id;


    
    const fav = await Fav.findOneAndUpdate(
        { user },
        {
            $push: { products: { $each: req.body.products } }
        },
        { new: true, upsert: true } // upsert: true creates the document if it doesn't exist
    );
    if (!fav) {
        fav = new Fav({ user, products: [] });
    } 
    fav.user = user;
    await fav.save();
    res.status(200).json({
        status: true,
        message: "Favorites updated successfully",
        favorites: fav
    });
});


export const getFav = catchError(async (req, res, next) => {
    const user= req.user._id
    const fav = await Fav.find({user:user}).populate('products', '-bestSelling -id -stock -createdAt -updatedAt -slug -_v -categoryName');
if(!fav){
    res.status(404).json({
        status:false ,
        message: "Favorites not found"

    })
}
    res.status(200).json({
        status: true,
        message: "Favorite item retrieved successfully",
        fav
    });
});



export const addProductsToOrder = catchError(async (req, res, next) => {
        const user = req.user._id;
        const id = req.body.id;
        const favorites = await Fav.findById(id).populate('products');

        if (!favorites || !favorites.products || !favorites.products.length) {
            return res.status(404).json({ message: 'No favorite products found for the user' });
        }

        const productsToAdd = favorites.products.map(product => product._id);

        let order = await Order.findOne({ userId: user });

        if (order) {

            order.products = [...new Set([...order.products, ...productsToAdd])]; 
            order.totalAmount = order.products.length;
        } else {

            order = new Order({
                userId: user,
                products: productsToAdd,
                totalPrice: 0, 
                totalAmount: productsToAdd.length,
            });
        }
        const savedOrder = await order.save();
        return res.status(201).json(savedOrder);
   
});

export const deleteAllFav =catchError(async(req,res,next)=>{
   const user = req.user._id
   const deleted =await Fav.findOneAndDelete({user})

   if(!deleted){
    return next(new AppError("Favorites not found", 404));
  }
res.status(200).json({
    status: true,
    message: "All favorites deleted successfully",
});
})

export const deleteFromFav = catchError(async (req, res, next) => {
    const user = req.user._id;

    let fav = await Fav.findOneAndUpdate(
        { user },
        {
            $pull: { products: { $in: req.body.products|| [] } } // Remove products
        },
        { new: true, upsert: true }
    )
    // .populate('products','user -__v -createdAt -updatedAt')

    res.status(200).json({
        status: true,
        message: "Favorites after deleting :",
        favorites: fav
    });
});