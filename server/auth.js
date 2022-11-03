const config = require('./config.js');
const express = require('express');
const router = express.Router();
const Passenger = require('./models/passenger.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const rulesEngine = require('./rulesEngine.js');

const signJWT = (passenger) => {
    let tokenValues = passenger.homeCity + ':' + passenger.favoriteCity + ':' + passenger.points;
    let token = jwt.sign({ values: tokenValues }, config.jwt.secret, {
        expiresIn: 86400
    });
    return token;
};

const auth = () => {
    router.route('/register')
    .post((req, res, next) => {     
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        Passenger.create({
            userId: req.body.userId,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            homeCity: req.body.homeCity,
            favoriteCity: req.body.favoriteCity,
            points: req.body.points
        }, (err, passenger) => {
            if(err)
                return res.status(200).send("Problem registering user.");
                
            let theToken = signJWT(passenger);
            res.status(200).send({ auth: true, token: theToken });
        });
    });
    
    router.route('/login') 
    .post((req, res) => {
        Passenger.findOne({ userId: req.body.userId }, (err, passenger) => {
            if(err)
                return res.status(200).send("Error on server");
            if(!passenger)
                return res.status(200).send("No passenger found");
                
            const passwordIsValid = bcrypt.compareSync(req.body.password, passenger.password);
            if(!passwordIsValid)
                return res.status(200).send({ auth: false, token: null});
                
            let theToken = signJWT(passenger);
            res.cookie('loginCookie', theToken);
            //-- Get the rule and send back with the token --
            let searchObj = {
                low_points: { $gte : passenger.points},
                high_points: { $lte: passenger.points * config.db.rangeFilters.double },
                homeCity: passenger.homeCity ? passenger.homeCity : "",
                favoriteCity: passenger.favoriteCity ? passenger.favoriteCity : ""
            };
            passenger['token'] = theToken;
            rulesEngine.findRule(searchObj, passenger, res);
        });
    });

    router.route('/logout')
    .get((req, res) => {
        res.status(200).send({ auth: false, token: null });
    });

    return router;
};

module.exports = auth;