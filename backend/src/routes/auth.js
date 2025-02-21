import express from 'express';
import { loginUser } from '../controllers/user.controller.js';
import verifyToken from '../middleware/verifyToken.js'
const router = express.Router();

router.route("/login").post(loginUser)

router.route("/validate-token").get(verifyToken, (req, res) => {
    res.status(200).send({userId: req._id})
})

router.route("/logout").post((req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    } )
    res.send();
})
export default router;         