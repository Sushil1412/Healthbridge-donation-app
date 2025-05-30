const mongoose = require('mongoose');

const hospitalRequestSchema = new mongoose.Schema({
    hospitalEmail: {
        type: String,
        required: true,
        trim: true
    },
    hospitalName: {
        type: String,
        required: true,
        trim: true
    },
    bloodType: {
        type: String,
        required: true,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    neededBy: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'fulfilled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
hospitalRequestSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const HospitalRequest = mongoose.model('HospitalRequest', hospitalRequestSchema);

module.exports = HospitalRequest;