// models/BloodRequestDonor.js
const mongoose = require('mongoose');

const bloodRequestDonorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  needByDate: {
    type: Date,
    required: true
  },
  needByTime: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },

  bloodGroup: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  status: {
    type: String,
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BloodRequestDonor', bloodRequestDonorSchema);