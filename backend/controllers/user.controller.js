const userModel = require('../models/user.model');
const service = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const isUserExists = await userModel.find({ email });
    
    if (isUserExists.length > 0) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = await service.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password,
    });

    const token = user.generateAuthToken();

    res.status(201).json({
        message: 'User registered successfully',
        user,
        token,
    });
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: '1Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: '2Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({
        message: 'User logged in successfully',
        user,
        token,
    });
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({
        message: 'User profile fetched successfully',
        user: req.user,
    });
}

module.exports.logoutUser = async (req, res, next) => {

    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    await blacklistTokenModel.create({ token });
    res.status(200).json({
        message: 'User logged out successfully',
    });
}