const config = require('./config.js');
const express = require('express');
const router = express.Router();
const rulesEngine = require('./rulesEngine.js');
const jwt = require('jsonwebtoken');

const routes = () => {
    router.route('/cms')
    .get((req, res, next) => {
        jwt.verify(req.query.token, config.jwt.secret, (err, decoded) => {
            if(err)
                return res.status(500).send({ auth: false, message: "Failed to authenticate" });
            
            let terms = decoded.values.split(':'); 
            let searchObj = {
                low_points: { $gte : terms[2] },
                high_points: { $lte : terms[2] * config.db.rangeFilters.double },
                homeCity: terms[0] ? terms[0] : "",
                favoriteCity: terms[1] ? terms[1] : ""
            };
            rulesEngine.findRule(searchObj, null, res);
        });
    });
    return router;
};

module.exports = routes;