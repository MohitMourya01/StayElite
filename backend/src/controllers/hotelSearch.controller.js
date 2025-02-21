import { Hotel } from "../models/hotel.model.js";
import Stripe from "stripe";
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


export const hotelSearch = async (req, res) => {
    try {

        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch(req.query.sortOption) {
            case "starRating":
                sortOptions = {starRating: -1}; // high to low
                break;
            case "pricePerNightAsc": 
                sortOptions = {pricePerNight: 1};
                break;
            case "pricePerNightDesc": 
                  sortOptions = {pricePerNight: -1};
                  break;
            
        }
        // pagination
        const pageSize = 5;
        const pageNumber = parseInt(req.query.page ? req.query.page.toString() : "1");
        const skip = (pageNumber - 1) * pageSize;
        // paginated hotels
        const hotels = await Hotel.find(query)
          .sort(sortOptions)
          .skip(skip)
          .limit(pageSize);

        const total = await Hotel.countDocuments(query);

        const response = {
            data: hotels,
            pagination: {
                total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.status(200).json(response);

    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const getRecentHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().sort("-lastUpdated");
        res.status(200).json(hotels);
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: "Error fetching hotels"});
    }
}

export const getHotelById = async (req, res) => {
    const id = req.params.id.toString();
    try {
        
        if(!id) {
            return res.status(400).json({message: "Hotel Id is Required"});
        }
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" }); 
        }
        return res.json(hotel);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error to fetch Hotel."})
    }

}

export const HotelBookings = async (req, res) => {
    try {
        const paymentIntentId = req.body.paymentIntentId;
        

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
        
        if(!paymentIntent) {
            return res.status(400).json({message: "Payment intent not found"})
        }

        if(paymentIntent.metadata.hotelId !== req.params.hotelId || paymentIntent.metadata.userId !== req._id)  {
            return res.status(400).json({message: "Payment intent mismatch"})
        }

        if(paymentIntent.status !== "succeeded") {
            return res
             .status(400)
             .json({
                message: `payment intent not succeeded. Status: ${paymentIntent.status}`
             })
        }


        const newBooking = {
            ...req.body,
            userId: req._id
        }

        const hotel = await Hotel.findOneAndUpdate(
            {_id: req.params.hotelId},
            {
                $push: {bookings: newBooking}
            }
        )

        if(!hotel) {
            return res.status(400).json({message: "Hotel not found"});
        }
        
        await hotel.save();
        res.status(200).send();
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }
}

export const createPaymentIntent = async (req, res) => {
    const { numberOfNights } = req.body;
    const hotelId = req.params.hotelId;
    const hotel = await Hotel.findById(hotelId);
    if(!hotel) {
        return res.status(400).json({message: "Hotel not found"})
    }

    const totalCost = hotel.pricePerNight * numberOfNights * 10;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: totalCost,
        currency: "inr",
        metadata: {
            hotelId,
            userId: req._id,
        },

    });


    if(!paymentIntent.client_secret) {
        return res.status(500).json({message: "Error creating payment intent"})
    }

    
    const response = {
        paymentIntentId: paymentIntent.id,
        client_secret: paymentIntent.client_secret.toString(),
        totalCost,
    }

    res.send(response);
}



const constructSearchQuery = (queryParams) => {
    let constructedQuery = {}

    if(queryParams.destination) {
        constructedQuery.$or = [
            {city: new RegExp(queryParams.destination, "i")}, // i -> case insensitive
            {country: new RegExp(queryParams.destination, "i")},
        ];
    }

    if(queryParams.adultCount) {
        constructedQuery.adultCount = {
            $gte: parseInt(queryParams.adultCount),
        };
    }

    if(queryParams.childCount) {
        constructedQuery.childCount = {
            $gte: parseInt(queryParams.childCount),
        };
    }

    if(queryParams.facilities) {
        constructedQuery.facilities = {
            $all: Array.isArray(queryParams.facilities)
            ? queryParams.facilities // single
            : [queryParams.facilities], // multiple
        };
    }

    if(queryParams.types) {
        constructedQuery.type = {
            $in: Array.isArray(queryParams.types)
                ? queryParams.types
                : [queryParams.types],
        };
    }

    if(queryParams.stars) {
        const starRatings = Array.isArray(queryParams.stars)
        ? queryParams?.stars?.map((star) => parseInt(star))  // queryParams.stars = ["3", "4", "5"];
        : parseInt(queryParams?.stars);  // {
        //     "starRatings": { "$in": [3, 4, 5]  all 3, 4, 5 or [3,4,5]}
        //   }

        

        constructedQuery.starRating = {$in: starRatings}
    }

    if (queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
          $lte: parseInt(queryParams.maxPrice).toString(),
        };
      }



    return constructedQuery;

}