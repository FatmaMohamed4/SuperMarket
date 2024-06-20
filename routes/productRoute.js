
import express from "express"
import { deleteProduct, getOneProduct, getProducts, updateProduct ,addProduct } from '../controllers/productController.js'
import protect from "../utils/protect.js";
const productRoute = express.Router();


productRoute.post('/add',addProduct)
productRoute.patch('/:id',updateProduct)
productRoute.delete('/:id', deleteProduct)



productRoute.get('/all',protect,getProducts)
productRoute.get('/',protect,getOneProduct)
export default productRoute