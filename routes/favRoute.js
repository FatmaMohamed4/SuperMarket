<<<<<<< HEAD

import express from 'express'
import protect from '../utils/protect.js';
import { addProductsToOrder, addToFav, getFav } from '../controllers/favController.js';
// import { addOrder } from '../controllers/orderController.js';
const favRoute = express.Router();

favRoute.get('/get',protect ,getFav)
favRoute.patch('/add',protect,addToFav)

favRoute.post('/addTo/order',protect,addProductsToOrder)

=======

import express from 'express'
import protect from '../utils/protect.js';
import { addProductsToOrder, addToFav, getFav } from '../controllers/favController.js';
// import { addOrder } from '../controllers/orderController.js';
const favRoute = express.Router();

favRoute.get('/get',protect ,getFav)
favRoute.patch('/add',protect,addToFav)

favRoute.post('/addTo/order',protect,addProductsToOrder)

>>>>>>> 0ef84618eafe6293b6acaef03b2b7f60db094ded
export default favRoute