'use strict';

const expect = require('chai').expect,
    fail = expect.fail,
    UserService = require('../../lib/service/user_service');

var userDaoMock = require('../mock/userDao_mock'),
    userService = new UserService(userDaoMock);

var userTest = {"name":"testName","token":"testtoken"}

describe('userService', () => {
    before(function(){

    });
    after(function(){

    });

    describe('#get', () => {
        it('it works', () => {
            userService.get(userTest, function(err, result){
                expect(result).to.not.be.null;
                expect(result.id).to.eq(1);
                expect(result.name).to.eq('testName');
                expect(result.token).to.eq('testtoken');
            });
        });
    });

    describe('#create', () => {
        it('it works', () => {
            userService.create(userTest, function(err, result){
                 expect(result).to.not.be.null;
                 expect(result.id).to.eq(1);
                 expect(result.name).to.eq('testName');
                 expect(result.token).to.eq('testtoken');
            });
        });
    });

    describe('#update', () => {
        it('it works', () => {
            userService.update(userTest, function(err, result){
                expect(result).to.not.be.null;
                expect(result.id).to.eq(1);
                expect(result.name).to.eq('testName');
                expect(result.token).to.eq('testtoken');
            });
        });
    });

    describe('#delete', () => {
        it('it works', () => {
            userService.delete(userTest, function(err, result){
                expect(result).to.not.be.null;
            });
        });
    });


});



