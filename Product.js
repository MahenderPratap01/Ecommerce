const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: Number,
    discount: Number,
    offerPrice: Number,
    reviews: [String]
});

const Product = mongoose.model("Product", ProductSchema);