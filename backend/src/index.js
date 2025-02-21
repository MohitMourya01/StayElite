import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.route.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import myHotelRoutes from './routes/my-hotels.route.js';
import hotelRoutes from './routes/hotelsSearch.route.js';
import bookingRoutes from './routes/my-bookings.route.js';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true,
})

const app = express();


const PORT =  process.env.PORT || 5000;
 mongoose
    .connect(process.env.DB_URI)
    .then(() => {
        console.log("Connected to database. ")
    })

app.use(express.static(path.join(__dirname, "../../frontend/dist")))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: ["http://localhost:5173", "https://stayelite.onrender.com"],
    credentials: true,
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/my-hotels", myHotelRoutes);
app.use("/api/v1/hotels", hotelRoutes);
app.use("/api/v1/my-bookings", bookingRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.listen(PORT, () => {
    console.log('server is running at', PORT)
})