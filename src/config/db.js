require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    if (!process.env.MONGO_URI) {
      console.error('MongoDB URI is not defined in environment variables!');
      process.exit(1);
    }

    mongoose.connect('mongodb://localhost:27017/demorecords');
      

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;
