const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  data: { type: String, required: true },  
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Record', recordSchema);
