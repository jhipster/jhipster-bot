const   UserService = require('../service/user_service'),
        UserDao = require('../dao/userDAO_postgre'),
        express = require('express'),
        router = express.Router();

var userDao = new UserDao();
var userService = new UserService(userDao);

router.param('name', function(req, res, next, name) {
    req.name = name;
    next();
});

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});


router
    .get('/user/:name',function(req, res){
        userService.get({ name: req.name }, function(err, result){
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

module.exports = router;