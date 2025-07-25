const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain',
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'ongoing', 'accepted', 'cancelled', 'completed'],
        default: 'pending',
    },
    duration: {
        type: Number,//seconds
    },
    distance: {
        type: Number, //meters
    },
    paymentID: {
        type: String
    },
    orderId: {
        type: String
    },
    signature: {
        type: String
    },
    otp:{
        type: String,
        select: false,
        required: true
    }
});

module.exports = mongoose.model('ride', rideSchema);