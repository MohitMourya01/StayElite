import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],      
    },
    firstName: {
        type: String,
        required: [true, "firstName is required"],   
    },
    lastName: {
        type: String,
        required: true,
    },

}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if(!this.isModified('password')){
       return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.TOKEN_EXPIRY
        }
    )
} 

// type UserType = InferSchemaType<typeof userSchema>; it can infer from schema

const User = mongoose.model("User", userSchema);
export default User;
