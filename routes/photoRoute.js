import express from "express"

import protect from "../utils/protect.js";
import { UPLOADCategory, uploadPhoto } from "../controllers/photoController.js";


const photoRoute = express.Router();

photoRoute.post('/add/:id',protect, uploadPhoto)

photoRoute.post('/category/:id', UPLOADCategory)

export default photoRoute