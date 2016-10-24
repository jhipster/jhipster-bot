var pg = require('pg');

var UserDAOPostgre = function(){
    var conString = '';
    this.client = new pg.Client(conString);
};

UserDAOPostgre.prototype.create = function(user){
    var results;
    client.query('INSERT INTO git_user (name, email, token) values($1, $2, $3)',
    [user.name, user.email, user.token]);

    const query = this.client.query('SELECT * FROM git_user WHERE email = \'$1\'', [user.name, user.email, user.token]
    function(err, result){
        if(err){
            results = err;
        }

        results = result.rows;
    });
    console.log(result.rows);
    return results;
};

UserDAOPostgre.prototype.update = function(user){

};

UserDAOPostgre.prototype.get = function(user){
    const query = this.client.query('SELECT * FROM git_user WHERE email = \'$1\'', [user.email]);


};

UserDAOPostgre.prototype.delete = function(user){

};