const express = require('express');
const Donor = require('../../models/Donor');
const Hospital = require('../../models/Hospital');
const UserRequest = require('../../models/UerRequest');
const BloodInventory = require('../../models/BloodInventory')
const HospitalRequest = require('../../models/HospitalRequest')
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
        const requests = await UserRequest.find({});
        res.json(requests);
        console.log(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
exports.adminapplicationupdate = async (req, res) => {
    try {
        const { requestId, status } = req.body; // Now using requestId instead of email

        // Validate status
        console.log(status);
        const validStatuses = ['Pending', 'Approved', 'unavailable', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Allowed values: Pending, Approved, unavailable, Rejected'
            });
        }

        // Find and update the request by its unique ID
        const updatedRequest = await UserRequest.findByIdAndUpdate(
            requestId,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: 'Request not found with the provided ID'
            });
        }

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

exports.adminhistory = async (req, res) => {
    try {
        const users = await UserRequest.find({
            status: { $in: ["approved", "unavailable"] }
        });

        res.json(users);
        console.log(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

//hospital request

// Controller
exports.hospitalinventory = async (req, res) => {
    try {
        const hospitalEmail = req.query.hospitalEmail; // ✅ use query instead of body
        // console.log("hospital email", hospitalEmail);

        const hospital = await Hospital.findOne({ email: hospitalEmail });
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        const inventory = await BloodInventory.find({ hospitalId: hospital.hospitalId });
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update or insert inventory entry
exports.inventoryupdate = async (req, res) => {
    try {
        const { hospitalEmail, name, bloodType, quantity, neededBy } = req.body;

        if (!hospitalEmail || !bloodType || !name || quantity === undefined) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const parsedQuantity = Number(quantity);
        if (isNaN(parsedQuantity)) {
            return res.status(400).json({ message: "Quantity must be a valid number." });
        }

        const hospital = await Hospital.findOne({ email: hospitalEmail });
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        const filter = {
            hospitalId: hospital.hospitalId,
            bloodType: bloodType
        };

        const total = Number(hospital.units || 0) + parsedQuantity;

        const update = {
            hospitalName: name,
            units: total,
            lastUpdated: new Date()
        };

        const options = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        };

        const updatedInventory = await BloodInventory.findOneAndUpdate(filter, update, options);

        res.status(200).json({ message: 'Inventory updated successfully.', data: updatedInventory });

    } catch (error) {
        console.error('Error in inventoryUpdate:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};


//hospital request

exports.hospitalrequest = async (req, res) => {

    try {
        const { hospitalEmail, hospitalName, bloodType, quantity, neededBy } = req.body;

        // Validate input
        if (!bloodType || !quantity || !neededBy) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create new request
        const newRequest = new HospitalRequest({
            hospitalEmail,
            hospitalName,
            bloodType,
            quantity,
            neededBy: new Date(neededBy),
            status: 'pending'
        });

        await newRequest.save();

        res.status(201).json({
            message: 'Blood request submitted successfully',
            request: newRequest
        });
    } catch (error) {
        console.error('Error submitting blood request:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}