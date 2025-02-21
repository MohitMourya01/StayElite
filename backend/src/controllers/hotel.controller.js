import { Hotel } from "../models/hotel.model.js";
import { v2 as cloudinary } from 'cloudinary';


export const addNewHotel = async (req, res) => {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;

        const { name, city, country, description, type, facilities, pricePerNight, starRating } = req.body;

        const errors = []; // Array to collect errors

        // Numeric Validation
        const parsedPrice = parseFloat(pricePerNight);
        const parsedRating = parseFloat(starRating);

        if (isNaN(parsedPrice) || parsedPrice <= 0) {
            errors.push("Price per night must be a valid number greater than zero.");
        }

        if (isNaN(parsedRating) || parsedRating <= 0) {
            errors.push("Star rating must be a valid number greater than zero.");
        }
        if (!facilities || facilities.length === 0) {
            errors.push("Facilities field required.");
        }
        if (!imageFiles || imageFiles.length === 0) {
            return res.status(400).json({ errors: ["At least one image is required."] });
        }
        // String Validation
        const stringFields = [name, city, country, description, type];

        stringFields.forEach(field => {
            if (!field || field.trim() === "") {
                errors.push("All fields are required.");
                return;
            }
        });

        if (errors.length > 0) {

            return res.status(400).json({ errors });
        }

        // upload
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.uploader.upload(dataURI);
            return res.url;
        });

        const imageUrls = await Promise.all(uploadPromises);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req._id;

        const hotel = new Hotel(newHotel);
        
            await hotel.save();
            // console.log("Hotel saved successfully:", hotel);
        res.status(201).send(hotel);

    } catch (error) {
        console.log("Error creating hotel: ", error);
        res.status(500).json({ message: "Something went wrong" })
    }
}


export const myHotels = async (req, res) => {
    
    try {
        const hotels = await Hotel.find({userId: req._id});
        res.json(hotels);

        
    } catch (error) {
        res.status(500).json({message: "Error fetching hotels"});
    }


}

export const getDetails = async (req, res) => {
    const id = req.params.id.toString();

    try {
        const hotel = await Hotel.findOne({
            _id: id,
            userId: req._id
        })

        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({message: "Error fetching hotels"});
    }
}

export const editDetails = async (req, res) => {
    try {
        const updatedHotel = req.body;
        updatedHotel.lastUpdated = new Date();
        const hotel = await Hotel.findOneAndUpdate(
            {
                _id: req.params.hotelId,
                userId: req._id
            },
             updatedHotel,
             {new: true}   
        );

        if(!hotel) {
            return res.status(404).json({message: "Hotel not found"})
        }

        const files = req.files;
        const uploadPromises = files.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.uploader.upload(dataURI);
            return res.url;
        });

        const updatedImageUrls = await Promise.all(uploadPromises);
        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || []),
    ];
         
         await hotel.save();
         res.status(201).json(hotel);

    } catch (error) {
        res.status(500).json({message: "Error fetching and edit hotels"});
    }
}

