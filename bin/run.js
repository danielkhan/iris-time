'use strict';
const request = require('superagent');

const http = require('http');
const config = require('../config');
const log = config.log();
const service = require('../server/service')(config);

const server = http.createServer(service);
server.listen(process.env.PORT || null);

server.on('listening', function () {
    log.info(`IRIS-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const irisUrl = process.env.IRIS_URL || 'http://127.0.0.1:3000';

    const announce = () => {
        request.put(`${irisUrl}/service/time/${server.address().port}`)
            .set('X-IRIS-SERVICE-TOKEN', config.serviceAccessToken)
            .set('X-IRIS-API-TOKEN', config.irisApiToken)
            .end((err) => {
                if (err) {
                    log.error(err);
                    log.error('Error connecting to Iris');
                }
            });
    };
    announce();
    setInterval(announce, 15 * 1000);
});