import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Fav from "../models/favouriteModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";



export const addToFav = catchError(async (req, res, next) => {
    const userId = req.user._id;
    let fav = await Fav.findOne({ userId });

    if (!fav) {
        fav = new Fav({ userId, products: [] });
    }

    if (req.body.products && Array.isArray(req.body.products)) {
        fav.products.push(...req.body.products);
        await fav.save();
    }

    res.status(200).json({
        status: true,
        message: "Favorites updated successfully",
        favorites: fav
    });
});


export const getFav = catchError(async (req, res, next) => {
    const userId = req.user._id;
    const id =req.body.id
    const fav = await Fav.findById(id).populate('products')


    res.status(200).json({
        status: true,
        message: "Items exist in favorite section",
        favorites: fav
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


