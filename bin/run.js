'use strict';
const request = require('superagent');

const http = require('http');
const config = require('../config');
const log = config.log();
const service = require('../server/service')(config);

const server = http.createServer(service);
server.listen();

server.on('listening', function () {
    log.info(`IRIS-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`https://test-dkhan-1.herokuapp.com/service/time/${server.address().port}`)
            .set('X-IRIS-SERVICE-TOKEN', config.serviceAccessToken)
            .set('X-IRIS-API-TOKEN', config.irisApiToken)
            .end((err) => {
                if (err) {
                    log.debug(err);
                    log.error('Error connecting to Iris');
                }
            });
    };
    announce();
    setInterval(announce, 15 * 1000);
});