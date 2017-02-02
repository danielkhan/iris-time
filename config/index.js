require('dotenv').config();

const bunyan = require('bunyan');

const log = {
    development: bunyan.createLogger({ name: 'IRIS-time-development', level: 'debug' }),
    production: bunyan.createLogger({ name: 'IRIS-time-production', level: 'info' }),
    // We don't want to have logging output in our test output - so go for only fatal errors
    test: bunyan.createLogger({ name: 'IRIS-time-test', level: 'fatal' }),

};

module.exports = {
    googleTimeApiKey: process.env.GOOGLE_TIME_API_KEY,
    googleGeoApiKey: process.env.GOOGLE_GEO_API_KEY,

    log: (env) => {
        if (env) return log[env];
        return log[process.env.NODE_ENV || 'development'];
    }
};