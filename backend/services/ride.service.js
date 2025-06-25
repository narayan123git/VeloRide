const rideModel = require('../models/ride.model');
const locationService = require('./location.service');
const NodeCache = require('node-cache');
const crypto = require('crypto');

const fareCache = new NodeCache({ stdTTL: 60 * 60 * 12 }); // cache lasts 12 hour

module.exports.getFare = async (pickup, destination) => {
  if (!pickup || !destination) throw new Error('Invalid pickup or destination');

  const cacheKey = `${pickup}_${destination}`;
  const cached = fareCache.get(cacheKey);
  if (cached) return cached;

  const distanceTime = await locationService.getDistanceTime(pickup, destination);
  if (!distanceTime) throw new Error('Could not calculate distance or time');

  const distanceKm = distanceTime.distance_meters / 1000;
  const durationMin = distanceTime.duration_seconds / 60;

  const fareRates = {
    bike: { base: 10, perKm: 2, perMin: 1 },
    auto: { base: 20, perKm: 3, perMin: 1 },
    car:  { base: 40, perKm: 5, perMin: 1 },
    taxi: { base: 30, perKm: 4, perMin: 1 }
  };

  const fareBreakdown = {};
  for (const [type, rate] of Object.entries(fareRates)) {
    const fare = Math.round(rate.base + distanceKm * rate.perKm + durationMin * rate.perMin);
    fareBreakdown[type] = {
      distanceKm: distanceKm.toFixed(2),
      durationMin: durationMin.toFixed(1),
      fare,
    };
  }

  // console.log(fareBreakdown);
  fareCache.set(cacheKey, fareBreakdown); // store result in cache
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
  const otp1=getOtp(6);
  const newRide = new rideModel({
    user: user,
    pickup,
    destination,
    otp: otp1,
    fare: fareBreakdown[vehicleType].fare,
  });
  return await newRide.save();
};

module.exports.verifyOtp = async (rideId, otp) => {
  if (!rideId || !otp) {
    throw new Error('Invalid ride ID or OTP');
  }

  const ride = await rideModel.findById(rideId).select('+otp');
  if (!ride) {
    throw new Error('Ride not found');
  }

  console.log('Comparing OTPs:', ride.otp, otp);
  return String(ride.otp) === String(otp);
};

