'use strict';

require('should');
const request = require('supertest');

const config = require('../../config');
const service = require('../../server/service')(config);

describe('The express service', () => {
    describe('GET /', () => {
        it('should return http/404', (done) => {
            request(service)
                .get('/')
                .expect(404, done);
        });
    });

    describe('GET /service/location', () => {
        it('should return HTTP:403 if called without an access token', (done) => {
            request(service)
                .get('/service/vienna')
                .expect(403)
                .end((err, res) => {
                    if (err) return done(err);
                    // here we are using should to make an assertion
                    res.body.should.be.empty;
                    return done();
                });
        });

        it('should return HTTP:200 and reply with a valid result', (done) => {
            request(service)
                .get('/service/vienna')
                .set('X-IRIS-SERVICE-TOKEN', config.serviceAccessToken)
                .expect(200)
                .end((err, res) => {

                    if (err) return done(err);
                    // here we are using should to make an assertion
                    res.body.result.should.exist;
                    return done();

                });
        });
    });
});