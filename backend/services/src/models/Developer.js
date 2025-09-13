const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;


const DeveloperSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  publicKey: { type: String, unique: true },
  secretKey: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Developer', DeveloperSchema);
