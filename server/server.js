const config = require('./config.js');
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./routes.js');
const auth = require('./auth.js');
const db = require('./db.js')(config.db.database);

const server = () => {

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(cors);
    app.use('/', routes());
    app.use('/auth', auth());
    db.init();

    return app;
};

module.exports = server;