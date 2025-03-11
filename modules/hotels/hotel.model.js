const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
    {
        hotelName:{
            type: String,
            required: true,
        },
        review:{
            type: String,
            required: true,
        },
        webPage:{
            type: String,
            required: true,
        }
    }
)