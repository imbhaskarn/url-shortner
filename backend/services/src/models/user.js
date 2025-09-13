const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true }, // Hashed before save
  otp: { type: String },
  otpExpiresAt: { type: Date },
  isVerified: { type: Boolean, default: false },
  address: { type: String, required: true },
  apiKey: { type: String, required: true, index: true }, // Consider hashing this too
  kycCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Encrypt OTP before saving
userSchema.methods.encryptOTP = async function (otp) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(otp, salt);
};

// ✅ Compare OTP
userSchema.methods.verifyOTP = async function (otp) {
  return await bcrypt.compare(otp, this.otp);
};

// ✅ Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
