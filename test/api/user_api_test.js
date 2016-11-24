'use strict';

var expect = require('chai').expect;
var assert = require('assert');
var request = require('supertest');
var mockery = require('mockery');


describe('Generator Router', () => {
    describe('When everything goes fine', () => {
        var api;
        before(() => {
            mockery.enable({
                useCleanCache: true,
                warnOnReplace: false,
                warnOnUnregistered: false
            });

            var UserService = require('../mock/user_service_mock').UserServiceSuccess;

            mockery.registerMock('../service/user_service', UserService);

            api = require('../../lib/api/api');
        });

        after(() => {
            api.close();
            mockery.disable();
        });

        describe('making the request GET /user/test@mail.com', () => {
            it('returns the response 200 and returns the expected user.', () => {
                request(api)
                    .get('/user/test@mail.com')
                    .send()
                    .expect(200)
                    .end(function(err, res){
                        if(err){
                            throw err;
                        }
                        expect(res.id).to.be.equal(1);
                        expect(res.name).to.be.equal('testName');
                        expect(res.email).to.be.equal('test@mail.com');
                        expect(res.token).to.be.equal('testtoken');
                    });
            });
        });

        describe('making the request POST /user', () => {
            it('returns the response 200 and returns user row added.', () => {
                var body = {"name":"testName","email":"test@mail.com","token":"testtoken"};

                request(api)
                    .post('/user')
                    .send(body)
                    .expect(200)
                    .end(function(err, res){
                        if(err){
                            throw err;
                        }
                        expect(res.id).to.be.equal(1);
                        expect(res.name).to.be.equal('testName');
                        expect(res.email).to.be.equal('test@mail.com');
                        expect(res.token).to.be.equal('testtoken');
                    });
            });
        });

        describe('making the request PUT /user', () => {
            it('returns the response 200 and returns user row update.', () => {
                var body = { "name":"testName","email":"test@mail.com","token":"testtoken"};
                request(api)
                    .put('/user/1')
                    .send(body)
                    .expect(200)
                    .end(function(err, res){
                        if(err){
                            throw err;
                        }
                        expect(res.id).to.be.equal(1);
                        expect(res.name).to.be.equal('testName');
                        expect(res.email).to.be.equal('test@mail.com');
                        expect(res.token).to.be.equal('testtoken');
                    });
            });
        });

        describe('making the request DELETE /user', () => {
            it('returns the response 200.', () => {
                request(api)
                    .delete('/user/1')
                    .send()
                    .expect(200)
                    .end(function(err, res){
                        if(err){
                            throw err;
                        }
                        expect(res.id).to.be.equal(1);
                        expect(res.name).to.be.equal('testName');
                        expect(res.email).to.be.equal('test@mail.com');
                        expect(res.token).to.be.equal('testtoken');
                    });
            });
        });
    });


    describe('When an error occurs', () => {
        var api;
        before(() => {
            mockery.enable({
                useCleanCache: true,
                warnOnReplace: false,
                warnOnUnregistered: false
            });

            var UserService = require('../mock/user_service_mock').UserServiceError;

            mockery.registerMock('../service/user_service', UserService);

            api = require('../../lib/api/api');
        });

        after(() => {
            api.close();
            mockery.disable();
        });

        describe('making the request GET /user/test@mail.com', () => {
            it('returns the response 500.', () => {

            });
        });

        describe('making the request POST /user', () => {
            it('returns the response 500.', () => {

            });
        });

        describe('making the request PUT /user', () => {
            it('returns the response 500.', () => {

            });
        });

        describe('making the request DELETE /user', () => {
            it('returns the response 500.', () => {

            });
        });
    });
});