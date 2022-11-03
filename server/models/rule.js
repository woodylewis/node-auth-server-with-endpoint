const mongoose = require('mongoose');
const Rule = mongoose.Schema;

const RuleSchema = new Rule({
    name: String,
    url: String,
    homeCity: String,
    favoriteCity: String,
    low_points: Number,
    high_points: Number
});

module.exports = mongoose.model('Rule', RuleSchema);