const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cardNumber: { type: String, required: true }, // Consider encrypting this
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true }, // Consider encrypting this
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

CardSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Card', CardSchema);
