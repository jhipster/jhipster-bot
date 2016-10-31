const   UserService = require('../service/user_service'),
        UserDao = require('../dao/userDAO_postgre'),
        express = require('express'),
        router = express.Router();

var userDao = new UserDao();
var userService = new UserService(userDao);

router.param('email', function(req, res, next, email) {
    if(!validateEmail(email)){
        res.status(500).send(JSON.stringify(
           {
               error : {
                   code: 500,
                   message: 'The email: '+ email +' is not valid'
               }
           }
       ));
       return;
    }
    req.email = email;
    next();
});

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});


router
    .get('/user/:email',function(req, res){
        userService.get({ email: req.email }, function(err, result){
            callbackHandler(err, result, res);
        });
    });

router
    .post('/user',function(req, res){
        userService.create(req.body, function(err, result){
            callbackHandler(err, result, res);
        });
    });

router
    .put('/user/:id',function(req, res){
        var user = req.body;
        user["id"] = req.id;
        userService.update(user, function(err, result){
            callbackHandler(err, result, res);
        });
    });

router
    .delete('/user/:id',function(req, res){
        var user = {
            id: parseInt(req.id)
        };
        userService.delete(user, function(err, result){
            callbackHandler(err, result, res);
        });
    });

function callbackHandler(err, result, res){
    if(err){
        res.status(500).send(JSON.stringify(
            {
                error : {
                    code: 500,
                    message: 'An error has occurred: '+ err
                }
            }
        ));
        return;
    }
    res.status(200).send(JSON.stringify(result));
};


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = router;