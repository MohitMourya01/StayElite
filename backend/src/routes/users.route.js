import express from 'express';
import { currUser, registerUser } from '../controllers/user.controller.js';
import verifyToken from '../middleware/verifyToken.js';


const router = express.Router();

router.get("/currentUser", verifyToken, currUser);
router.route('/register').post(registerUser)

export default router;