<<<<<<< HEAD
import express from "express"

import protect from "../utils/protect.js";
import { UPLOADCategory, uploadPhoto } from "../controllers/photoController.js";


const photoRoute = express.Router();

photoRoute.post('/add/:id',protect, uploadPhoto)

photoRoute.post('/category/:id', UPLOADCategory)

=======
import express from "express"

import protect from "../utils/protect.js";
import { uploadPhoto } from "../controllers/photoController.js";


const photoRoute = express.Router();

photoRoute.post('/add/:id',protect, uploadPhoto)



>>>>>>> 0ef84618eafe6293b6acaef03b2b7f60db094ded
export default photoRoute