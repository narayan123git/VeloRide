const axios = require('axios');

module.exports.getAddressCoordinates = async (address) => {
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

    return response.data[0];
  } catch (error) {
    console.error('Geocoding error:', error.message);
    return null;
  }
};

module.exports.getDistanceTime = async (originAddress, destinationAddress) => {
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

    return {
      distance_meters: route.summary.distance,
      duration_seconds: route.summary.duration,
      // route_geometry: route.geometry
    };
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

