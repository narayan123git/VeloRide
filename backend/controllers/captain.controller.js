const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captainModel.findOne({ email });

    if (isCaptainExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    if (!hashedPassword) {
        return res.status(500).json({ message: 'Error hashing password' });
    }

    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        res.status(201).json({
            message: 'Captain registered successfully',
            captain,
            token,
        });
    }
    catch (error) {
        console.error('Error registering captain:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.clearCookie('token', { httpOnly: true, sameSite: 'Lax' });

    const token = captain.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,       // true if using HTTPS
        sameSite: 'Lax',
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    });

    res.status(200).json({
        message: 'Captain logged in successfully',
        captain,
        token,
    });
};

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({
        message: 'Captain profile retrieved successfully',
        captain: req.captain,
    });
};

module.exports.logoutCaptain = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if(!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    res.clearCookie('token');

    await blacklistTokenModel.create({ token });
    
    res.status(200).json({ message: 'Captain logged out successfully' });
};