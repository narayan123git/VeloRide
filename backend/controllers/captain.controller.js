const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captainModel.findOne({ email });

    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    if (!hashedPassword) {
        return res.status(500).json({ message: 'Error hashing password' });
    }

    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        res.status(201).json({
            message: 'Captain registered successfully',
            captain,
            token,
        });
    }
    catch (error) {
        console.error('Error registering captain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// New method to get captain profile
module.exports.getProfile = async (req, res, next) => {
    // Assuming req.captain is populated by authMiddleware
    res.status(200).json({ message: 'Captain profile', captain: req.captain });
};

// New method to update captain profile
module.exports.updateProfile = async (req, res, next) => {
    // Implement update logic as needed; here we stub a response using req.body
    res.status(200).json({ message: 'Updated profile', captain: req.body });
};