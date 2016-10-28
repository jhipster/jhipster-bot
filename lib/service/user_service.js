

var UserService = function(userDAO){
    this.userDAO = userDAO;
};

UserService.prototype.create = function(user, callback){
    this.userDAO.create(user,function(err, results){
        callback(err, results);
    });
};

UserService.prototype.update = function(user, callback){
    this.userDAO.update(user,function(err, results){
        callback(err, results);
    });
};

UserService.prototype.get = function(user, callback){
    this.userDAO.get(user,function(err, results){
        callback(err, results);
    });
};

UserService.prototype.delete = function(user, callback){
     this.userDAO.delete(user,function(err, results){
        callback(err, results);
    });
};

module.exports = UserService;