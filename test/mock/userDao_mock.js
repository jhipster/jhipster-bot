'use strict';

module.exports = {
    get : function(user, callback){
       callback(null, {"id":1, "name":"testName", "token":"testtoken"});
    },

    update : function(user, callback){
        callback(null, user);
    },

    delete : function(user, callback){
        callback(null, {});
    },

    create : function(user, callback){
        user["id"] = 1;
        callback(null, user);
    }
}