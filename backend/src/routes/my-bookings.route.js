import express from 'express';
import { Hotel } from '../models/hotel.model.js';
import verifyToken from '../middleware/verifyToken.js'
const router = express.Router();

// /api/v1/my-bookings

router.get("/", verifyToken, async (req, res) => {
    try {
        const hotels = await Hotel.find({
            bookings: {$elemMatch: {userId: req._id}}, // booking array
        });
        
        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter(
                (booking) => booking.userId === req._id
            );

            const hotelWithUserBookings = {
                ...hotel.toObject(),
                bookings: userBookings,
            };

            return hotelWithUserBookings;
        });

        return res.status(200).send(results);


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Unable to fetch bookings"});
    }
})

export default router;