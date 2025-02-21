import User from '../models/user.model.js';
// import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose';

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, password, email } = req.body;

        if ([firstName, lastName, password, email].some((field) => !field || (typeof field === "string" && field.trim() === ""))) {
            return res.status(400).json({ message: "All field required" })
        }

        let user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        user = new User(req.body);
        await user.save();

        const token = user.generateAccessToken()
        res.cookie("auth_token", token, {
            httpOnly: true, // can not be accessed on the server 
            secure: process.env.NODE_ENV == "production",
            maxAge: 86400000,
        })
        return res.status(200).send({ message: "User registered OK" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }
}
const loginUser = async (req, res) => {
      const {email, password} = req.body;

      try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Invalid Credentials"})
        }
        const isMatch = await user.isPasswordCorrect(password);

        if(!isMatch) {
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const token = user.generateAccessToken();
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })
        res.status(200).json({userId: user._id})
        
      } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
        
      }

}

const currUser = async (req, res) => {
    
    const userId = req._id;
    
    try {
        const user = await User.findById(userId).select("-password");
        if(!user) {
            return res.status(400).json({message: "User not found"})
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export {
    registerUser,
    loginUser,
    currUser,
}