// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true } // ইমেজের লিঙ্ক বা URL
});

module.exports = mongoose.model('MenuItem', menuItemSchema);