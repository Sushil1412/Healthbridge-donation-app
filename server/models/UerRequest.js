const mongoose = require('mongoose');

const UserRequestSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Blood', 'Organ'],
        required: true
    },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: function () { return this.type === 'Blood'; }
    },
    organ: {
        type: String,
        enum: ['Kidney', 'Liver', 'Heart', 'Lung', 'Pancreas'],
        required: function () { return this.type === 'Organ'; }
    },
    additionalInfo: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'unavailable', 'Rejected'],
        default: 'Pending'
    },
    neededBy: {
        type: Date,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('UserRequest', UserRequestSchema);
