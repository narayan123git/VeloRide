const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Email is not valid'],
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not return password in queries
    },
    socketId: {
        type: String,
    },

    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],
        default: 'inactive',
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Vehicle color must be at least 3 characters long'],
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            match: [/^[A-Z0-9]{1,10}$/, 'Vehicle plate must be alphanumeric and up to 10 characters long'],
        },
        earnings: {
            type: Number,
            default: 0,
        },
        lastOnlineAt: { type: Date },
        lastOfflineAt: { type: Date },
        hoursOnline: {
            type: Number,
            default: 0,
        },
        distance: {
            type: Number,
            default: 0,
        },
        totalRides: {
            type: Number,
            default: 0,
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'taxi', 'auto'],
        },
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            // required: true
            default: [0, 0],
        }
    }


});

captainSchema.index({ location: '2dsphere' });

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, role: 'captain' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
    return token;
}

captainSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
const captainModel = mongoose.model('Captain', captainSchema);
module.exports = captainModel;