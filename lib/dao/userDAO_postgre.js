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

UserDAOPostgre.prototype.create = function(user, callback){
    var results = {};

    this.pool.connect(function(err, client, done) {
      if(err) {
        callback(err, results);
        return;
      }
      client.query('INSERT INTO git_user (name, email, token) values($1, $2, $3)',
        [user.name, user.email, user.token], function(err, result) {
            done();
            if(err) {
              callback(err, results);
              return;
            }
            if(result.rows[0]){
                results = result.rows[0];
            }
            callback(error, results);
      });
    });
};

UserDAOPostgre.prototype.update = function(user, callback){
  var results = {};

  this.pool.connect(function(err, client, done) {
    if(err) {
        callback(err, results);
        return;
    }
    client.query('UPDATE git_user SET name = $1, email = $2, token = $3 WHERE id = $4;', [user.name, user.email, user.token, user.id],
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

UserDAOPostgre.prototype.get = function(user, callback){
    var results = {};
    var error;

    this.pool.connect(function(err, client, done) {
      if(err) {
        callback(err, results);
        return;
      }

      client.query('SELECT * FROM git_user WHERE email = $1;', [user.email], function(err, result) {
        done();
        if(err) {
          callback(err, results);
          return;
        }

        if(result.rows[0]){
            results = result.rows[0];
        }
        callback(error, results);
      });

    });
};

UserDAOPostgre.prototype.delete = function(user, callback){
    var results = {};
    var error;

    this.pool.connect(function(err, client, done) {
      if(err) {
        callback(err, results);
        return;
      }
      client.query('DELETE FROM git_user WHERE id = $1;', [user.id], function(err, result) {
        done();
        if(err) {
          callback(err, results);
          return;
        }
        if(result.rows[0]){
            results = result.rows[0];
        }
        callback(error, results);
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

module.exports = UserDAOPostgre;