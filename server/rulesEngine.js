const Rule = require('./models/rule.js');

module.exports = {
    findRule: ((params, returnObj, res) => {
        Rule.findOne(params, (err, rule) => {
            if(err)
                console.log("Error on server");
            if(!rule) {
                res.status(200).send({rule: "No rule" });
            }
            else {
                let response = {};
                response.rule = rule.name;
                if(returnObj) {
                    response['passenger'] = returnObj;
                    response['token'] = returnObj.token;
                } 
                res.status(200).send({ theResponse : response });
            }     
        });
    })
};