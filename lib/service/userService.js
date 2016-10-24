

var UserService = function(userDAO){
    this.userDAO = userDAO;
};

UserService.prototype.create = function(user){
    userDAO.create(user);
};

UserService.prototype.update = function(user){
    userDAO.update(user);
};

UserService.prototype.get = function(user){
    userDAO.get(user);
};

UserService.prototype.delete = function(user){
    userDAO.delete(user);
};