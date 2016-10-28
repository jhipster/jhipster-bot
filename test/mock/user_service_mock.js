'use strict';

var error = {};
var results = {"id":1,"name":"testName","email":"test@mail.com","token":"testtoken"};

var UserServiceSuccess = function(){

};

UserServiceSuccess.prototype.create = function(user, callback){
    callback(null, results);
};

UserServiceSuccess.prototype.update = function(user, callback){
   callback(null, results);
};

UserServiceSuccess.prototype.get = function(user, callback){
    callback(null, results);
};

UserServiceSuccess.prototype.delete = function(user, callback){
    callback(null, results);
};



var UserServiceError = function(){

};

UserServiceError.prototype.create = function(user, callback){
        callback(error, {});
};

UserServiceError.prototype.update = function(user, callback){
   callback(error, {});
};

UserServiceError.prototype.get = function(user, callback){
    callback(error, {});
};

UserServiceError.prototype.delete = function(user, callback){
    callback(error, {});
};

module.exports = {
    UserServiceSuccess : UserServiceSuccess,
    UserServiceError : UserServiceError
};