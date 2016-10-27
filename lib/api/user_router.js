const   UserService = require('../service/user_service'),
        UserDao = require('../dao/userDAO_postgre'),
        express = require('express'),
        router = express.Router();

var userDao = new UserDao();
var userService = new UserService(userDao);

router.param('email', function(req, res, next, email) {
    console.log('doing email validations on ' + email);
    // once validation is done save the new item in the req
    req.email = email;
    // go to the next thing
    next();
});

router.param('id', function(req, res, next, id) {
    console.log('doing id validations on ' + id);
    // once validation is done save the new item in the req
    req.id = id;
    // go to the next thing
    next();
});


router
    .get('/user/:email',function(req, res){
        console.log(req.email);
        userService.get({ email: req.email }, function(err, result){
            if(err){
                res.status(500);
            }
            res.status(200).send(JSON.stringify(result));
        });
    });

router
    .post('/user',function(req, res){
        userService.create(req.body, function(err, result){
            if(err){
                res.status(500);
            }
            res.status(200).send(JSON.stringify(result));
        });
    });

router
    .put('/user/:id',function(req, res){
        var user = req.body;
        user["id"] = req.param;
        userService.update(user, function(err, result){
            if(err){
                res.status(500);
            }
            res.status(200).send(JSON.stringify(result));
        });
    });

router
    .delete('/user/:id',function(req, res){
        userService.delete(req.id, function(err, result){
            if(err){
                res.status(500);
            }
            res.status(200).send(JSON.stringify(result));
        });
    });


module.exports = router;