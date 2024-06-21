import express from "express"
import { addCategory, addProductsToCategory, deleteCategory, getCategories, getCategory, getProductsAndCategory, upateCategory } from "../controllers/categoryController.js";
import protect from "../utils/protect.js";

const categoryRoute = express.Router();


categoryRoute.post('/add',addCategory)
categoryRoute.patch('/:id', upateCategory)
categoryRoute.delete('/:id',deleteCategory)



categoryRoute.get('/all',protect,getCategories)
categoryRoute.get('/:categoryName',protect,getCategory)
categoryRoute.post('/',protect,addProductsToCategory)
categoryRoute.post('/filter',protect,getProductsAndCategory )
export default categoryRoute
