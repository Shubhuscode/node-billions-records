// src/config/db.js

// Load environment variables from .env file
require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Ensure that MONGO_URI is provided in the .env file
    if (!process.env.MONGO_URI) {
      console.error('MongoDB URI is not defined in environment variables!');
      process.exit(1);
    }

    // Connect to MongoDB using the URI from the environment variable
    mongoose.connect('mongodb://localhost:27017/demorecords');
      

    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;
