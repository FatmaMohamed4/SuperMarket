
import express from 'express'
import protect from '../utils/protect.js';
import { editCheckOut, getAdresses, getCheckOut } from '../controllers/checkController.js';
const checkRoute = express.Router();

checkRoute.get('/:orderId', protect,getCheckOut)
checkRoute.patch('/:orderId' , protect, editCheckOut)

checkRoute.get('/address/', protect ,getAdresses)
export default checkRoute