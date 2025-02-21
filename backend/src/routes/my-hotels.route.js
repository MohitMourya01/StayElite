import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { addNewHotel, myHotels, getDetails, editDetails} from '../controllers/hotel.controller.js';
import verifyToken from '../middleware/verifyToken.js';
import { Hotel } from '../models/hotel.model.js';
const router = express.Router();

// upto 6 images allowed
router.post("/", verifyToken ,upload.array("imageFiles", 6), addNewHotel);



router.get("/", verifyToken, myHotels);

router.get("/:id", verifyToken, getDetails);

router.put("/:hotelId", verifyToken, upload.array("imageFiles"), editDetails);

export default router;