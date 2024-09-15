import express from "express"
import { addOrder, getOrder, addProductsToOrder, calculateOrderTotals, updateProductQuantity, deleteFromOrder, deleteOrder  } from "../controllers/orderController.js";
import protect from "../utils/protect.js";


const orderRoute = express.Router();
orderRoute.post('/create',protect,addOrder)
orderRoute.get('/get',protect,getOrder)
orderRoute.patch('/add',protect,addProductsToOrder)
orderRoute.get('/total',protect,calculateOrderTotals)
orderRoute.patch('/update/quantity/:orderId',updateProductQuantity)

orderRoute.delete('/delete',protect,deleteFromOrder)
orderRoute.delete('/deleteAllOrder', protect, deleteOrder)
export default orderRoute