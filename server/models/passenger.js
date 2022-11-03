const mongoose = require('mongoose');
const Passenger = mongoose.Schema;

const PassengerSchema = new Passenger({
    userId: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    homeCity: String,
    favoriteCity: String,
    points: Number
});

module.exports = mongoose.model('Passenger', PassengerSchema);