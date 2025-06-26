const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const locationService = require('../services/location.service');
const { SocketSendMessageToSocketId } = require('../socket.js')
const { getIO } = require('../socket.js');
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
            SocketSendMessageToSocketId('/captain', captain.socketId, 'ride-request', ride)
            console.log(`📤 Sent 'ride-request' `)
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

    const ride = await rideModel.findById(rideId).populate('user').select('+otp');

    // 1. Update ride status
    ride.status = 'accepted';
    ride.captain = captainId;
    await ride.save();

    // 2. Send socket message to the ride's user
    const userSocketId = ride.user.socketId;
    const captain = await captainModel.findById(captainId);
    captain.status = 'active'

    // console.log("✅ Ride after accept:", ride);
    console.log('✅ Ride accepted, sending OTP:', ride.otp);


    SocketSendMessageToSocketId('/user', userSocketId, 'ride-accepted', {
        rideId: ride._id,
        otp: ride.otp,
        captainName: `${captain.fullname.firstname} ${captain.fullname.lastname}`,
        vehicleNumber: captain.vehicle.plate,
        vehicleModel: `${captain.vehicle.color} ${captain.vehicle.vehicleType}`,
        pickup: ride.pickup,
        destination: ride.destination,
        price: ride.fare,
    });

    io = getIO()
    // 3. Notify all other captains to remove this ride
    io.emit('remove-ride-from-queue', { rideId: ride._id });

    res.status(200).json({ message: 'Ride accepted successfully' ,data:ride});
};

module.exports.verifyOtp = async (req, res) => {
    const { rideId, otp } = req.body;
    const isVerified = await rideService.verifyOtp(rideId, otp);
    if (isVerified) {
        // Notify user to start riding
        const ride = await rideModel.findById(rideId).populate({ path: 'user', select: 'socketId' }); // <-- explicitly select socketId;
        const userSocketId = ride.user.socketId;
        io = getIO()
        io.of('/user').to(userSocketId).emit('ride-started', { rideId  });
        console.log(`📤 Sent 'ride-started' to ${userSocketId}`);
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid OTP.' });
    }
};

module.exports.completeRide = async(req, res) => {
  const { rideId } = req.body;
  const ride = await rideModel.findById(rideId);
  if (!ride) return res.status(404).json({ message: 'Ride not found' });

  // Mark ride as completed
  ride.status = 'completed';
  await ride.save();

  // Update captain stats
  const captain = await captainModel.findById(ride.captain);
  if (captain) {
    captain.vehicle.earnings += ride.fare || 0;
    captain.vehicle.distance += ride.distance || 0;
    captain.vehicle.totalRides += 1;
    // Optionally update hoursOnline here if you track session time
    await captain.save();
  }

  res.json({ message: 'Ride completed and captain stats updated.' });
};
