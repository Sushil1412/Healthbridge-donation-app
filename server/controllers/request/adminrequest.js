const express = require('express');
const Donor = require('../../models/Donor');
const Hospital = require('../../models/Hospital');
const UserRequest = require('../../models/UerRequest');

const router = express.Router();

// Get all pending requests (both donors and hospitals)
exports.adminrequest = async (req, res) => {
    try {
        // Get pending donor registrations
        const pendingDonors = await Donor.find({ status: 'pending' }).select('-password -__v');
        // Get pending hospital registrations
        const pendingHospitals = await Hospital.find({ status: 'pending' }).select('-password -__v');

        res.json({
            donors: pendingDonors,
            hospitals: pendingHospitals
        });
    } catch (error) {
        console.error('Error fetching requests:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update request status (handles both donor and hospital)
exports.adminupdate = async (req, res) => {
    try {
        const { type, id } = req.params;
        const { status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        let model;
        if (type === 'donor') {
            model = Donor;
        } else if (type === 'hospital') {
            model = Hospital;
        } else {
            return res.status(400).json({ message: 'Invalid type. Must be "donor" or "hospital"' });
        }

        const updatedEntity = await model.findByIdAndUpdate(
            id,
            { status },
            { new: true, select: '-password -__v' }
        );

        if (!updatedEntity) {
            return res.status(404).json({ message: `${type} not found` });
        }

        res.json({
            message: `${type} request ${status} successfully`,
            [type]: updatedEntity
        });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all pending requests
exports.adminapplication = async (req, res) => {
    try {
        const requests = await UserRequest.find({ status: 'Pending' });
        res.json(requests);
        console.log(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.adminapplicationupdate = async (req, res) => {
    try {
        // const { email } = req.params.email; // Get ID from URL parameters
        const { email, status } = req.body;

        // Validate status
        const validStatuses = ['Pending', 'Approved', 'unavailable', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Allowed values: pending, accepted, unavailable, rejected'
            });
        }
        console.log("hiii", email);
        // Find and update the request
        const updatedRequest = await UserRequest.findOneAndUpdate(
            { email: email },  // Query by email instead of ID
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: 'Request not found with the provided ID'
            });
        }

        // Successful response
        res.status(200).json({
            success: true,
            message: 'Request status updated successfully',
            data: updatedRequest
        });

    } catch (err) {
        console.error('Error updating request status:', err);
        res.status(500).json({
            success: false,
            message: 'Server error while updating request status',
            error: err.message
        });
    }
};