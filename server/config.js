const rc = require('rc');
const appName = 'ng-app-express';

module.exports = rc(appName, {
    server: {
        port: 8080
    },
    jwt: {
        secret: 'xxxxxxxxxxx'
    },
    db: {
        database: 'mongodb://ng-cms-mongodb:27017/api',
        rangeFilters: {
            double: 2
        }  
    }
});
