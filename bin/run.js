'use strict';
const request = require('superagent');

const http = require('http');
const config = require('../config');
const log = config.log();
const service = require('../server/service')(config);

const server = http.createServer(service);
server.listen();

server.on('listening', function() {
    log.info(`IRIS-Time is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`http://127.0.0.1:3000/service/time/${server.address().port}`, (err) => {
            if(err) {
                log.debug(err);
                log.error('Error connecting to Iris'); 
            }
        });
    };
    announce();
    setInterval(announce, 15*1000);
});