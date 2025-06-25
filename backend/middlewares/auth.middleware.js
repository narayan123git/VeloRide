const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
  let token = null;

  // 1. Check for Bearer token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Fallback to cookie token
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  // 3. No token found
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'Token is blacklisted.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports.authCaptain = async (req, res, next) => {

  const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

  // console.log('Captain token:', token);
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const isBlacklisted = await blacklistTokenModel.findOne({ token });
  if (isBlacklisted) {
    return res.status(401).json({ message: 'Token is blacklisted.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('Decoded captain:', decoded);
    if (decoded.role !== 'captain') {
      return res.status(401).json({ message: 'Invalid token role...' });
    }

    const captain = await captainModel.findById(decoded._id);
    if (!captain) {
      return res.status(401).json({ message: 'Invalid token.2' });
    }
    req.captain = captain;
    next();
  }
  catch (err) {
    console.error('Authentication error:', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
