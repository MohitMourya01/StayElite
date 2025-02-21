import express from 'express';
import { createPaymentIntent, getHotelById, HotelBookings, hotelSearch } from '../controllers/hotelSearch.controller.js';
import Stripe from "stripe";
import verifyToken from '../middleware/verifyToken.js';
import { Hotel } from '../models/hotel.model.js';
import { getRecentHotels } from '../controllers/hotelSearch.controller.js';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.get("/search", hotelSearch);

router.get("/", getRecentHotels)
router.get("/:id", getHotelById)

// payment intent
router.post("/:hotelId/bookings/payment-intent", verifyToken, createPaymentIntent);

router.post("/:hotelId/bookings", verifyToken, HotelBookings);

export default router;
