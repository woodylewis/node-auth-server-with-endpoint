const mongoose = require('mongoose');
const Rx = require('rx');
const RxNode = require('rx-node');
const Passenger = require('./models/passenger.js');
const passengerData = require('./data/data_passengers.js');
const Rule = require('./models/rule.js');
const rulesData = require('./data/data_rules.js');
const bcrypt = require('bcryptjs');

module.exports = function(host) {

    const init = () => {    
        try {
            mongoose.Promise = global.Promise;
            const mongooseConnect = Rx.Observable  
                  .fromPromise(mongoose.connect( host, {
                    useMongoClient: true
                  }));

            mongooseConnect
            .subscribe((db) => { 
                console.log('connected to ' + host);
                seed(db);
            }, e => console.error(e));
        } catch (e) {
            console.log('db connect error ' + e);
        }
    };

    const seed = (db) => {
            Passenger.find( {}, (err, passengers) => {
                if(err) {
                    console.log('passenger find error');
                } else {
                    if(passengers.length === 0) {
                        console.log('loading passenger data');
                        try {    
                            let passengerRecords = passengerData.records;
                            passengerRecords
                            .forEach((p, index) => {
                                db.collections.passengers.insertOne({
                                    "userId": p.userId,
                                    "password": bcrypt.hashSync(p.password, 8),
                                    "firstName": p.firstName,
                                    "lastName": p.lastName,
                                    "email": p.email,
                                    "points": p.points,
                                    "homeCity": p.homeCity,
                                    "favoriteCity": p.favoriteCity
                                });
                            });
                        } catch(e) {
                            console.log('db error ' + e);
                        }
                    } else {
                        console.log('# passenger records = ' + passengers.length);
                    }
                }
            });

            Rule.find( {}, (err, rules) => {
                if(err) {
                    console.log('rule find error');
                } else {
                    if(rules.length === 0) {
                        console.log('loading rule data');
                        try {   
                            let rulesRecords = rulesData.records;
                            rulesRecords
                            .forEach((r, index) => {
                                db.collections.rules.insertOne({
                                    "name": r.name,
                                    "homeCity": r.homeCity,
                                    "favoriteCity": r.favoriteCity,
                                    "low_points": r.low_points,
                                    "high_points": r.high_points     
                                });
                            });
                        } catch(e) {
                            console.log('db error ' + e);
                        }
                    } else {
                        console.log('# rule records = ' + rules.length);
                    }
                }
            });


    };

    return {
        init: init,
        seed: seed
    };
};

