
import express from "express"

import protect from "../utils/protect.js";
import { uploadPhoto } from "../controllers/photoController.js";


const photoRoute = express.Router();

photoRoute.post('/add/:id',protect, uploadPhoto)


export default photoRoute
