const rideModel = require('../models/ride.model');
const locationService = require('./location.service');
const crypto = require('crypto');

module.exports.getFare = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error('Invalid pickup or destination');
  }

  const distanceTime = await locationService.getDistanceTime(pickup, destination);

  if (!distanceTime) {
    throw new Error('Could not calculate distance or time');
  }

  const distanceKm = distanceTime.distance_meters / 1000;
  const durationMin = distanceTime.duration_seconds / 60;

  // Define fare rules per vehicle
  const fareRates = {
    bike: { base: 10, perKm: 2, perMin: 1 },
    auto: { base: 20, perKm: 3, perMin: 1 },
    car:  { base: 40, perKm: 5, perMin: 1 },
    taxi: { base: 30, perKm: 4, perMin: 1 }
  };

  const fareBreakdown = {};

  for (const [vehicleType, rates] of Object.entries(fareRates)) {
    const fare = Math.round(
      rates.base + (distanceKm * rates.perKm) + (durationMin * rates.perMin)
    );

    fareBreakdown[vehicleType] = {
      distanceKm: distanceKm.toFixed(2),
      durationMin: durationMin.toFixed(1),
      fare
    };
  }

  return fareBreakdown;
};

function getOtp(num) {
  if (!Number.isInteger(num) || num < 1) {
    throw new Error('Invalid OTP length');
  }

  const min = Math.pow(10, num - 1);
  const max = Math.pow(10, num) - 1;

  return crypto.randomInt(min, max + 1); // upper bound is exclusive
}

module.exports.createRide = async (user, pickup, destination, vehicleType) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('Invalid user, pickup, destination, or vehicle type');
  }

  const fareBreakdown = await module.exports.getFare(pickup, destination);

  const newRide = new rideModel({
    user: user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fareBreakdown[vehicleType].fare,
  });

  return await newRide.save();
};
