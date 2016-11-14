const   UserService = require('../service/user_service'),
        UserDao = require('../dao/userDAO_postgre'),
        express = require('express'),
        router = express.Router(),
        authenticationMiddleware = require('./auth/authentication_middleware');

var userDao = new UserDao();
var userService = new UserService(userDao);

/* Make sur that the user is connected */
router.use(authenticationMiddleware);

router.param('name', function(req, res, next, name) {
    req.name = name;
    next();
});

router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});


router
    .get('/:name', function(req, res){
        userService.get({ name: req.name }, function(err, result){
            callbackHandler(err, result, res);
        });
    });

router
    .post('/', function(req, res){
        userService.create(req.body, function(err, result){
            callbackHandler(err, result, res);
        });
    });

router
    .put('/:id',function(req, res){
        var user = req.body;
        user["id"] = req.id;
        userService.update(user, function(err, result){
            callbackHandler(err, result, res);
        });
    });

router
    .delete('/:id',function(req, res){
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