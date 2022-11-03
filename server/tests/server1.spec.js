const server = require('../server.js');
const dbHost = 'mongodb://docker.wlsllc.net:27017/api';
const db = require('../db.js')(dbHost);

const expect = require('chai').expect

describe('The server', function () {
    it('starts listening, function', function * () {
        const theUrl = 'mongodb://docker.wlsllc.net:27017/api';
        const startStub = this.sandbox.stub(db, 'init', function(theUrl, cb) {
            cb(null);
        });
        expect(startStub).to.be.calledWith(theUrl);
    });
});