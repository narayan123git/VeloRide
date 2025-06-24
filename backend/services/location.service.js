const axios = require('axios');
const NodeCache = require('node-cache');
const captainModel = require('../models/captain.model');
const cache = new NodeCache({ stdTTL: 86400 }); // cache TTL 1 day (in seconds)

module.exports.getAddressCoordinates = async (address) => {
  const cacheKey = `geocode_${address}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
      params: {
        key: process.env.LOCATIONIQ_KEY,
        q: address,
        format: 'json'
      }
    });

    if (!response.data || response.data.length === 0) {
      throw new Error('No geocode results found');
    }

    const coordinates = response.data[0];
    cache.set(cacheKey, coordinates);
    return coordinates;
  } catch (error) {
    console.error('Geocoding error:', error.message);
    return null;
  }
};

module.exports.getDistanceTime = async (originAddress, destinationAddress) => {
  const cacheKey = `distance_${originAddress}_${destinationAddress}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
    const originCoords = await module.exports.getAddressCoordinates(originAddress);
    const destinationCoords = await module.exports.getAddressCoordinates(destinationAddress);

    if (!originCoords || !destinationCoords) {
      throw new Error('Failed to geocode one or both addresses');
    }

    const coordinates = [
      [originCoords.lon, originCoords.lat],
      [destinationCoords.lon, destinationCoords.lat]
    ];

    const response = await axios.post(
      'https://api.openrouteservice.org/v2/directions/driving-car',
      {
        coordinates,
        radiuses: [1000, 1000]
      },
      {
        headers: {
          Authorization: process.env.ORS_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const route = response.data.routes?.[0];
    if (!route) throw new Error('No route found');

    const result = {
      distance_meters: route.summary.distance,
      duration_seconds: route.summary.duration
    };

    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    if (error.response?.data) {
      console.error('ORS API error:', error.response.data);
    } else {
      console.error('Distance and Time error:', error.message);
    }
    return null;
  }
};


module.exports.getSuggestions = async (query) => {
  try {
    const response = await axios.get('https://us1.locationiq.com/v1/search.php', {
      params: {
        key: process.env.LOCATIONIQ_KEY,
        q: query,
        format: 'json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('LocationIQ API error:', error.message);
    return null;
  }
};

module.exports.getCaptainInRadius = async (lat, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius / 6378.1] // earth radius in km
      }
    }
  });
  return captains;
};

