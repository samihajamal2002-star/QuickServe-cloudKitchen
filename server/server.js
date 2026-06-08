const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ১. মিডলওয়্যার (ডাটা আদান-প্রদান সহজ করার জন্য)
app.use(express.json()); 
app.use(cors());

// ২. ডাটাবেস কানেকশন (তোমার .env ফাইলের MONGO_URI ব্যবহার করবে)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ Database Connection Error:", err));

  // অথেন্টিকেশন রাউট লিংক করা
app.use('/api/auth', require('./routes/authRoutes'));

// ৩. টেস্ট রাউট (সার্ভার কাজ করছে কিনা চেক করার জন্য)
app.get('/', (req, res) => {
  res.send("🚀 Quick Serve Backend is Running!");
});

// ৪. পোর্ট সেটআপ এবং সার্ভার চালু করা
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});