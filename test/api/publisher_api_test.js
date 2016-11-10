var api = require('../../lib/api/api');
var request = require('supertest');


var body = {};
request(api)
    .post('/publisher/directory')
    .send()
    .expect(500)
    .end(function(err, res){
        if(err){
            console.log(err);
        }else{
            console.log(res);
        }

    });