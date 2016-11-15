

var UserService = function(userDAO){
    this.userDAO = userDAO;
};

UserService.prototype.create = function(user, callback){
    this.userDAO.create(user,function(err, result){
        callback(err, result);
    });
};

UserService.prototype.update = function(user, callback){
    this.userDAO.update(user,function(err, result){
        callback(err, result);
    });
};

UserService.prototype.get = function(user, callback){
    this.userDAO.get(user,function(err, result){
        callback(err, result);
    });
};

UserService.prototype.delete = function(user, callback){
     this.userDAO.delete(user,function(err, result){
        callback(err, result);
    });
};

UserService.prototype.createOrUpdate = function(user, callback){
    var self = this;
    self.userDAO.get(user, function(err, result){
        if(result && !isEmptyObject(result)){
            user['id'] = result.id
            self.userDAO.update(user, function(err, result){
                callback(err, result);
            });
        }else{
            self.userDAO.create(user, function(err, result){
                callback(err, result);
            });
        }
    });
};

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

module.exports = UserService;