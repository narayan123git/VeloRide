const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const locationController = require('../controllers/location.controller');
const {query} = require('express-validator');

router.get('/get-coordinates',
    query('address').isLength({ min: 3 }).withMessage('Address must be at least 3 characters long'),
    authMiddleware.authUser,
    locationController.getCoordinates
)

router.get('/get-distance-time',
    query('origin').isLength({ min: 3 }).withMessage('Origin must be at least 3 characters long'),
    query('destination').isLength({ min: 3 }).withMessage('Destination must be at least 3 characters long'),
    authMiddleware.authUser,
    locationController.getDistanceTime
)

router.get('/get-suggestions',
    query('address').isLength({ min: 3 }).withMessage('Query must be at least 3 characters long'),
    authMiddleware.authUser,
    locationController.getSuggestions
)

module.exports = router;