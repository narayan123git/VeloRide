const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const locationService = require('../services/location.service');
const { SocketSendMessageToSocketId } = require('../socket.js')
const {getIO} = require('../socket.js');
const rideModel = require('../models/ride.model.js');
const captainModel = require('../models/captain.model.js');

module.exports.createRide = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { pickup, destination, vehicleType } = req.body;
        const ride = await rideService.createRide(req.user._id, pickup, destination, vehicleType);
        res.status(201).json({ message: 'Ride created successfully', ride: ride });

        const pickupCoordinates = await locationService.getAddressCoordinates(pickup);
        // console.log('Pickup coordinates:', pickupCoordinates);
        const captainsInRadius = await locationService.getCaptainInRadius(pickupCoordinates.lat, pickupCoordinates.lon, 200);
        // console.log('Captains in radius:', captainsInRadius);
        captainsInRadius.map(async captain => {
            SocketSendMessageToSocketId(captain.socketId, 'ride-request', ride)
        })
    } catch (error) {
        next(error);
    }
};

module.exports.getFare = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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

module.exports.acceptRide = async (req, res) => {
    const { rideId, captainId } = req.body;

    const ride = await rideModel.findById(rideId).populate('user');

    // 1. Update ride status
    ride.status = 'accepted';
    ride.captain = captainId;
    await ride.save();

    // 2. Send socket message to the ride's user
    const userSocketId = ride.user.socketId;
    const captain = await captainModel.findById(captainId);

    SocketSendMessageToSocketId(userSocketId, 'ride-accepted', {
        rideId: ride._id,
        captainName: `${captain.fullname.firstname} ${captain.fullname.lastname}`,
        vehicleNumber: captain.vehicle.plate,
        vehicleModel: `${captain.vehicle.color} ${captain.vehicle.vehicleType}`,
        pickup: ride.pickup,
        destination: ride.destination,
        price: ride.fare,
    });

    io=getIO()
    // 3. Notify all other captains to remove this ride
    io.emit('remove-ride-from-queue', { rideId: ride._id });

    res.status(200).json({ message: 'Ride accepted successfully' });
};

module.exports.verifyOtp = async (req, res) => {
    const { rideId, otp } = req.body;
    const isVerified = await rideService.verifyOtp(rideId, otp);
    if (isVerified) {
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};
