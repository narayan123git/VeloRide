const locationService = require('../services/location.service');
const { validationResult } = require('express-validator');
module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { address } = req.query;

        if (!address) {
            return res.status(400).json({ error: 'Address is required' });
        }

        const coordinates = await locationService.getAddressCoordinates(address);

        if (!coordinates) {
            return res.status(404).json({ error: 'Coordinates not found for the given address' });
        }

        // console.log('Coordinates:', coordinates);
        res.status(200).json({
            "lat": coordinates.lat,
            "lon": coordinates.lon
        });
    } catch (error) {
        console.error('Error getting coordinates:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { origin, destination } = req.query;

        if (!origin || !destination) {
            return res.status(400).json({ error: 'Origin and destination are required' });
        }

        const distanceTime = await locationService.getDistanceTime(origin, destination);

        if (!distanceTime) {
            return res.status(404).json({ error: 'Distance and time not found for the given addresses' });
        }

        // console.log('Distance and Time:', distanceTime);
        res.status(200).json(distanceTime);
    } catch (error) {
        console.error('Error getting distance and time:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { address } = req.query;        
        if (!address) {
            return res.status(400).json({ error: 'Address is required' });
        }
        const suggestions = await locationService.getSuggestions(address);
        if (!suggestions) {
            return res.status(404).json({ error: 'Suggestions not found for the given address' });
        }
        // console.log('Suggestions:', suggestions);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error getting suggestions:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
