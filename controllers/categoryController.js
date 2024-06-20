import Category from "../models/categoryModel.js"
import asyncHandler from "express-async-handler"

export const addCategory =asyncHandler(async(req,res)=>{
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

export const getCategories = asyncHandler(async(req,res) =>{
           const all = await Category.find()
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

export const getCategory =asyncHandler(async(req,res)=>{
        const categoryName = req.params.categoryName 
        const category = await Category.findOne({
            $or: [
                { categoryName: categoryName },
                { slug: categoryName }
            ]
        });
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

export const upateCategory =asyncHandler(async(req,res)=>{
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

export const deleteCategory = asyncHandler(async (req,res)=>{
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
