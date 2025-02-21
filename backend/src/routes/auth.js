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
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        expires: new Date(0),
        path: "/",
    } )
    res.send();
})
export default router;         