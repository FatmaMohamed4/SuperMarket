import express from 'express'
import protect from '../utils/protect.js';
import { addProductsToOrder, addToFav, deleteAllFav, deleteFromFav, getFav } from '../controllers/favController.js';
// import { addOrder } from '../controllers/orderController.js';
const favRoute = express.Router();

favRoute.get('/getFav' ,protect,getFav)
favRoute.patch('/addFav',protect,addToFav)

favRoute.post('/addTo/order',protect,addProductsToOrder)

favRoute.delete('/all',protect, deleteAllFav)
favRoute.delete('/one',protect,deleteFromFav)
export default favRoute