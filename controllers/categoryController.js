import AppError from "../middlewares/AppError.js"
import catchError from "../middlewares/catchError.js"
import Category from "../models/categoryModel.js"
import Product from "../models/productModel.js"


export const addCategory =catchError(async(req,res)=>{
            const {categoryName , products } = req.body 

            const  categoty = await Category.findOne(
                { $or: [{ categoryName: categoryName }, { slug: categoryName }] },
              )

            if(!categoty){
              const catgory =  await Category.create(req.body)
                res.status(201).json({
                    status : true ,
                    message : "Category is created"  ,
                    catgory : catgory
                })
            }else {
                res.status(409).json({
                    status : false ,
                    message : "Category is existed" 
                })
            }
   })

export const getCategories = catchError(async(req,res) =>{
           const all = await Category.find().select('-products -_id -__v -slug -createdAt -updatedAt')
           if(!all){
            res.status(404).json({
                status : false ,
                message : "Categories not found" 
            })
           }else {
            res.status(200).json({
                status : true ,
                categories : all
            })
           }
    })

export const getCategory =catchError(async(req,res)=>{
        const categoryName = req.params.categoryName 
        const category = await Category.findOne({
            $or: [
                { categoryName: categoryName },
                { slug: categoryName }
            ]
        }).select('-_id -__v -slug -createdAt -updatedAt');

        if(!category){
            res.status(404).json({
                status : false ,
                message : "Category not found" 
            })
        }
        res.status(200).json({
            status : true ,
            message : category 
        })
    })

export const upateCategory =catchError(async(req,res)=>{
        const id =req.params.id 
        const category = await Category.findByIdAndUpdate(id , req.body,{ new: true})
        if(!id){
            res.status(404).json({
                status : false ,
                message : "Category not found" 
            })
        } else{
            res.status(200).json({
                status : true ,
                message : "Category Is updated" ,
                category : category
            })
        }
    })

export const deleteCategory = catchError(async (req,res)=>{
           const category = await Category.findByIdAndDelete(req.params.id)
            if(!category){
                res.status(404).json({
                    status : false ,
                    message : "Category ID is not found" 
                })
            } 
            res.status(200).json({
                status : true ,
                message : "Category Is Deleted" 
            })
    })



    export const addProductsToCategory = catchError(async (req, res, next) => {
        const { categoryId, productIds } = req.body;
    
        try {
            // Find the category by ID
            const category = await Category.findById(categoryId);
    
            if (!category) {
                return next(new AppError('Category not found', 404));
            }
    
            // Find products by their IDs
            const products = await Product.find({
                _id: { $in: productIds } // Use $in operator to find products by array of IDs
            });
    
            // if (products.length !== productIds.length) {
            //     return next(new AppError('One or more products not found', 404));
            // }
    
            // Add products to the category
            category.products.push(...products.map(product => product._id));
            await category.save();
    
            res.status(200).json({
                status: 'success',
                message: 'Products added to category successfully',
                category
            });
        } catch (err) {
            // Handle other potential errors
            return next(err);
        }
    });

    

    export const getProductsAndCategory = catchError(async (req, res, next) => {
        try {
            const categoryName = req.body.categoryName
            const products = await Product.find({categoryName}).select( '-_id -__v -slug -createdAt -updatedAt -stock -quantity -categoryName');
    
            if (!products) {
                return res.status(404).json({
                    status: false,
                    message: "No products found"
                });
            }
    
            res.status(200).json({
                status: true,
                products: products
            });
        } catch (err) {
            // Handle errors
            return next(err);
        }
    });


    // export const filterCategory = catchError(async (req, res, next) => {
    //     const { categoryName } = req.body;
    
    //     try {
    //         // Find the category by categoryName or slug and populate the products field with product details
    //         const category = await Category.findOne({
    //             $or: [
    //                 { categoryName },
    //                 { slug: categoryName }
    //             ]
    //         })
    //         .populate({
    //             path: 'products',
    //             select: '_id name price description', // Select fields you want to include from each product
    //             // Optionally, you can add more population options like 'model' or 'select' here
    //         })
    //         .select('-_id -__v -slug -createdAt -updatedAt'); // Exclude unnecessary fields from category
    
    //         if (!category) {
    //             return next(new AppError('Category not found', 404));
    //         }
    
    //         res.status(200).json({
    //             status: 'success',
    //             category // This will now include products with details
    //         });
    //     } catch (err) {
    //         // Handle other potential errors
    //         return next(err);
    //     }
    // });