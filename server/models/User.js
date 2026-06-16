const mongoose = require('mongoose'); // এই লাইনটি যোগ করুন

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String, required: true },
    role: { type: String, enum: ['customer', 'admin', 'chef', 'rider'], default: 'Customer' }
});

module.exports = mongoose.model('User', userSchema);