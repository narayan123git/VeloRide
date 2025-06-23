const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
module.exports.createRide = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, vehicleType } = req.body;
        const newRide = await rideService.createRide(req.user._id, pickup, destination, vehicleType);
        res.status(201).json({ message: 'Ride created successfully', ride: newRide });
    } catch (error) {
        next(error);
    }
};

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { pickup, destination } = req.query;
        const fare = await rideService.getFare(pickup, destination);
        res.status(200).json({ message: 'Fare fetched successfully', fare });
    } catch (error) {
        next(error);
    }
};