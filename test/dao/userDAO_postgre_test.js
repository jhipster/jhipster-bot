'user strict';
const expect = require('chai').expect,
    fail = expect.fail,
    mockery = require('mockery');

describe('userDAO',() => {
    describe('#get', () => {
        describe('When trying to get the user with the email \'dummy@gmail.com\'', () => {
            var pgtest, userDAO_postgre;
            before(function(){
               /* mockery.enable({
                    useCleanCache: true,
                    warnOnReplace: false,
                    warnOnUnregistered: false
                });

                pgtest = require('pgtest');
                pgtest.expect('SELECT * FROM git_user WHERE email = $1;', ['dummy@gmail.com'])
                    .returning(null, [{ id:1, name:'dummy', email:'dummy@gmail.com', token:'mytoken'}]);

                mockery.registerMock('pg-pool', pgtest);*/
                var UserDao = require('../../lib/dao/userDAO_postgre');
                userDAO_postgre = new UserDao();
            });

            after(function(){
               // pgtest.reset();
            });

            it('it returns the expected user', () => {
                var emailTest = 'dummy@gmail.com';

                userDAO_postgre.get({email: emailTest}, function(err, results){
                    expect(results[0]).to.not.be.null;
                    expect(results[0].id).to.eq(1);
                    expect(results[0].name).to.eq('dummy');
                    expect(results[0].email).to.eq('dummy@gmail.com');
                    expect(results[0].token).to.eq('mytoken');
                });
               // pgtest.check();
            });
        });
    });
    describe('#create', () => {
        describe('When trying to add a complete user', () => {
            var user = {name: 'test', email: 'test@mail.com', token: 'testtoken'};
            var UserDao = require('../../lib/dao/userDAO_postgre');
            userDAO_postgre = new UserDao();
            before(function(){

            });

            after(function(){

            });
            it('no errors occurs', () =>{
                userDAO_postgre.create(user, function(err, results){
                    expect(err).to.be.null;
                });
            });
        });
        describe('When trying to add an incomplete user', () => {
            var UserDao = require('../../lib/dao/userDAO_postgre');
            userDAO_postgre = new UserDao();
            describe('without the name set', () => {
                it('an errors is set', () =>{
                    var user = { email: 'test@mail.com', token: 'testtoken'};
                    userDAO_postgre.create(user, function(err, results){
                        expect(err).to.be.not.null;
                    });
                });
            });
            describe('without the email set', () => {
                it('an errors is set', () =>{
                     var user = {name: 'test', token: 'testtoken'};
                     userDAO_postgre.create(user, function(err, results){
                        expect(err).to.be.not.null;
                     });
                });
            });
            describe('without the token set', () => {
                var user = {name: 'test', email: 'test@mail.com'};
                it('an errors is set', () =>{
                    userDAO_postgre.create(user, function(err, results){
                        expect(err).to.be.not.null;
                    });
                });
            });
        });
    });

    describe('#update', () => {
         describe('When trying to udate an incomplete user', () => {
            var UserDao = require('../../lib/dao/userDAO_postgre');
            userDAO_postgre = new UserDao();
            describe('without the name set', () => {
                it('an errors is set', () =>{
                    var user = { email: 'test@mail.com', token: 'testtoken'};
                    userDAO_postgre.update(user, function(err, results){
                        expect(err).to.be.not.null;
                    });
                });
            });
            describe('without the email set', () => {
                it('an errors is set', () =>{
                     var user = {name: 'test', token: 'testtoken'};
                     userDAO_postgre.update(user, function(err, results){
                        expect(err).to.be.not.null;
                     });
                });
            });
            describe('without the token set', () => {
                var user = {name: 'test', email: 'test@mail.com'};
                it('an errors is set', () =>{
                    userDAO_postgre.update(user, function(err, results){
                        expect(err).to.be.not.null;
                    });
                });
            });
        });
    });
});