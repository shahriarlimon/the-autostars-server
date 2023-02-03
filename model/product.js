const mongoose = require('mongoose');
const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    image: {
        type: String,
        required: [true, "image is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    },
    quantity: {
        type: Number,
        required: true
    },
    supplier: {
        type: String,
        required: [true, "supplier name is required"]
    }
})

module.exports = mongoose.model("Car", carSchema)