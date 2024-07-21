import AppError from "../middlewares/AppError.js";
import catchError from "../middlewares/catchError.js";
import Product from "../models/productModel.js";

// Add a new product
export const addProduct = catchError(async (req, res, next) => {
    const newProduct = await Product.create(req.body);
    if (!newProduct) {
        return next(new AppError('Error adding new product', 400));
    }
    res.status(201).json({
        message: "Added a new product",
        product: newProduct
    });
});

// Get all products
export const getProducts = catchError(async (req, res, next) => {
    const products = await Product.find()
    if (!products.length) {
        return next(new AppError('Products not found', 404));
    }
    res.status(200).json({
        status: true,
        message: products
    });
});

//Get one product by name
// export const getOneProduct = catchError(async (req, res, next) => {
//     const { name } = req.body;
//     let product;

//     if (name) {
//         product = await Product.find(
//             { $or: [{ productName: name }, { slug: name }] }
//         ).select('-__v -slug');
//     }

//     if (!product) {
//         return next(new AppError('Product not found', 404));
//     }

//     res.status(200).json({
//         status: 'success',
//         product: product
//     });
// });
export const getOneProduct = catchError(async (req, res, next) => {
    const { name } = req.body;
    let product;

    if (name) {
        const regex = new RegExp(name, 'i'); // 'i' makes it case-insensitive
        product = await Product.find(
            { $or: [{ productName: { $regex: regex } }, { slug: { $regex: regex } }] }
        ).select('-__v -slug');
    }

    if (!product || product.length === 0) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        status: 'success',
        product: product
    });
});

// Update a product
export const updateProduct = catchError(async (req, res, next) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).select('-_id -slug -__v');

    if (!updatedProduct) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        status: true,
        message: updatedProduct
    });
});

// Delete a product
export const deleteProduct = catchError(async (req, res, next) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id).select('-_id -slug -__v');
    if (!deletedProduct) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        status: true,
        deletedProduct: deletedProduct
    });
});


export const bestSelling = catchError(async (req, res, next) => {
    const products = await Product.find({ bestSelling: true });
  
    if (!products || products.length === 0) {
      return next(new AppError('No best selling products found', 404));
    }
  
    res.status(200).json({
      status: true,
      message: 'Best selling products found',
      products,
    });
  });

