const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  intake: { type: String, required: true },
  stream: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  faceEncoding: { type: [Number], required: true }, // Store face encodings here
});

module.exports = mongoose.model('User', userSchema);
