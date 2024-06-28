
import express from 'express'
import protect from '../utils/protect.js';
import { addProductsToOrder, addToFav, getFav } from '../controllers/favController.js';
// import { addOrder } from '../controllers/orderController.js';
const favRoute = express.Router();

favRoute.get('/get',protect ,getFav)
favRoute.patch('/add',protect,addToFav)

favRoute.post('/addTo/order',protect,addProductsToOrder)

export default favRoute