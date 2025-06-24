const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');
const { body,query } = require('express-validator');

router.post('/create',
  authMiddleware.authUser,
  body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
  body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
  body('vehicleType').isString().isIn(['bike', 'auto', 'car', 'taxi']).withMessage('Invalid vehicle type'),
  rideController.createRide
);

router.post('/accept',
  authMiddleware.authCaptain,
  body('rideId').isString().isLength({ min: 3 }).withMessage('Invalid ride ID'),
  body('captainId').isString().isLength({ min: 3 }).withMessage('Invalid captain ID'),
  rideController.acceptRide
);

router.post('/verify-otp',
  authMiddleware.authCaptain,
  body('rideId').isMongoId().withMessage('Invalid ride ID'),
  body('otp').isLength({ min: 4, max: 6 }).withMessage('Invalid OTP'),
  rideController.verifyOtp
);

router.get('/get-fare',
  authMiddleware.authUser,
  query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
  query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
  rideController.getFare
);

module.exports = router;