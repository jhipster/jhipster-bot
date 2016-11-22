var Pool = require('pg-pool');
var url = require('url');
const PS_CONNECTION_URL = require('../configuration').ps_connection_url;

var UserDAOPostgre = function(){
    var config = extractConfigFromUrl(PS_CONNECTION_URL);
    config["max"] = 20; //Max number of clients in the pool
    config["idleTimeoutMillis"] = 20000; //The time a client can be idle in the pool before being deleted

    this.pool = new Pool(config);

    //Error handling
    this.pool.on('error',function(err, client){
        console.error('idle client error ', err.message, err.stack);
    });
};


UserDAOPostgre.prototype.get = function(user, callback){
    this.executeRequest('SELECT * FROM git_user WHERE name = $1;', [user.name], user, callback);
};

UserDAOPostgre.prototype.delete = function(user, callback){
    this.executeRequest('DELETE FROM git_user WHERE id = $1;', [user.id], user, callback);
};

UserDAOPostgre.prototype.create = function(user, callback){
    this.executeRequest('INSERT INTO git_user (name, token) values($1, $2)',
        [user.name, user.token], user, callback);
};

UserDAOPostgre.prototype.update = function(user, callback){
  var results = {};

  this.pool.connect(function(err, client, done) {
    if(err) {
        callback(err, results);
        return;
    }
    client.query('UPDATE git_user SET name = $1, token = $2 WHERE id = $3;',
        [user.name, user.token, user.id],
    function(err, result) {
        done();
        if(err) {
          callback(err, results);
          return;
        }
    });

    client.query('SELECT * FROM git_user WHERE id = $1;', [user.id], function(err, result){
        done();
        if(err) {
          callback(err, results);
          return;
        }
        if(result.rows[0]){
            results = result.rows[0];
        }
        callback(null, results);
    });
  });
};



function extractConfigFromUrl(databaseUrl){
    const params = url.parse(databaseUrl);
    const auth = params.auth.split(':');

    var config = {
      user: auth[0],
      password: auth[1],
      host: params.hostname,
      port: params.port,
      database: params.pathname.split('/')[1],
      ssl: true
    };
    return config;
};

UserDAOPostgre.prototype.executeRequest = function(request, variables, user, callback){
    var result = {};
    var error;

    this.pool.connect(function(err, client, done) {
      if(err) {
        callback(err, results);
        return;
      }
      client.query(request, variables, function(err, results) {
        done();
        if(err) {
          callback(err, result);
          return;
        }
        if(results.rows[0]){
            result = results.rows[0];
        }
        callback(error, result);
      });
    });
}

module.exports = UserDAOPostgre;