import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";


export const addOrder = catchError(async (req, res, next) => {
    const userId = req.user._id;
    const products = req.body.products;
    const existingOrder = await Order.findOne({ userId });

    if (existingOrder) {
        return next(new AppError('User already has an order', 409));
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
        return next(new AppError('Please add products to order', 400));
    }

    for (const productId of products) {
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return next(new AppError(`Product with ID ${productId} not found`, 404));
        }
    }
    const newOrder = await Order.create({ userId, products });

    res.status(201).json({
        status: true,
        message: "Order created successfully",
        order: newOrder
    });
});

export const getOrder= catchError(async (req, res, next) => {
    const userId = req.user._id;

    try {
        const order = await Order.findOne({userId})
        .populate('products');

        if (!order) {
            return next(new AppError('Order not found', 404));
        }

        // Populate products with actual product documents
        // const populatedOrder = await (await order.populate('products','-_v -slug -createdAt -updatedAt -_id -stock')).populate('userId','-password -_v -_id')

        res.status(200).json({
            status: true,
            message: order
        });
    } catch (err) {
        return next(new AppError(err.message, 500));
    }
});


export const addProductsToOrder = catchError(async (req, res, next) => {
    const orderId = req.params.id;
    const userId = req.user._id;
    const order = await Order.findOne({userId});
    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    if (order.userId.toString() !== userId.toString()) {
        return next(new AppError('Unauthorized to update this order', 403));
    }

    if (req.body.products && Array.isArray(req.body.products)) {
        order.products.push(...req.body.products);
    }

    const updatedOrder = await order.save();

    res.status(200).json({
        status: true,
        message: "Order updated successfully",
        order: updatedOrder
    });
});

export const calculateOrderTotals =catchError( async( req,res,next) => {
    // const { orderId } = req.params.id;
    const userId =req.user._id 

    const order = await Order.findOne({userId}).populate('products');

    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    // Calculate totals
    let totalAmount = 0;
    let totalPrice = 0;

    for (const item of order.products) {
        const product = await Product.findOne(item.productId);
        if (product) {
            totalAmount += item.quantity;
            totalPrice += item.price * item.quantity;

            
        }
    }
    order.totalAmount = totalAmount
    order.totalPrice = totalPrice
    await order.save()

    // Respond with calculated totals
    res.status(200).json({
        status: true,
        message: "Order totals calculated successfully" ,
        totalAmount,
        totalPrice,
        order: order  
        
    });
})

export const addProductsTo_FAV = catchError(async (req, res, next) => {
    const orderId = req.params.id;
    const userId = req.user._id;
    const order = await Order.findOne({userId});
    if (!order) {
        return next(new AppError('Order not found', 404));
    }

    if (order.userId.toString() !== userId.toString()) {
        return next(new AppError('Unauthorized to update this order', 403));
    }

    if (req.body.products && Array.isArray(req.body.products)) {
        order.products.push(...req.body.products);
    }

    const updatedOrder = await order.save();

    res.status(200).json({
        status: true,
        message: "Order updated successfully",
        order: updatedOrder
    });
});


export const getOrders_ofUser = catchError(async(req,res,next)=>{
    const user = req.user._id
    const orders = await Order.find({userId :user }).populate('products','-bestSelling -id -stock -rate -createdAt -updatedAt -slug -_v -categoryName')

    if(!orders){
        return next(new AppError('Orders not found', 404));
    }
    res.status(200).json({
      status: true,
      message: "Orders",
      orders,
    });
})


export const updateProductQuantity = catchError(async (req, res, next) => {
    const { orderId } = req.params;
    var { productId, newQuantity } = req.body;
    const order = await Order.findById(orderId).populate('userId').populate('products')

    if (!order) {
      return next(new AppError('Order not found', 404));
    }

    const product = order.products.find(p => p._id.toString() == productId);
    if (!product) {
      return next(new AppError('Product not found in the order', 404));
    }

    product.quantity = newQuantity;

// // Calculate totals
let totalAmount =0
let totalPrice =0

for (const item of order.products) {
    const product = await Product.find(item.productId);
    if (product) {
        totalAmount += item.quantity;
        totalPrice += item.price * item.quantity;

        await order.save()
        
    }
}

order.totalAmount = totalAmount
order.totalPrice = totalPrice

const updatedOrder = await Order.findByIdAndUpdate(
    { _id: orderId },
    { products: order.products, totalAmount:totalAmount, totalPrice:totalPrice },
    { new: true }
).populate('products');

res.status(200).json({
    status: true,
    message: "Order updated successfully",
    // order
     updatedOrder
});
  });

  export const deleteFromOrder = catchError(async (req, res, next) => {
    const userId = req.user._id;

    let order = await Order.findOneAndUpdate(
        { userId },
        {
            $pull: { products: { $in: req.body.products|| [] } } // Remove products
        },
        { new: true, upsert: true }
    )

    res.status(200).json({
        status: true,
        message:"Order is updated"
    });
});
export const deleteOrder = catchError(async(req,res,next)=>{
    const userId =req.user._id
    const order = await Order.findOneAndDelete({ userId: userId });
    res.status(200).json({
        status: true,
        message:"Order is deleted" ,
       deletedOrder:  order
    });
})