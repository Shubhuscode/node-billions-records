// src/models/record.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  data: { type: String, required: true }, // Simplified for demo, could be complex data
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Record', recordSchema);
