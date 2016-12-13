const express = require('express'),
      UserService = require('../service/user_service'),
      UserDao = require('../dao/userDAO_postgre'),
      AuthenticationException = require('../exception/exceptions').AuthenticationException,
      publisher = require('../publisher/application_publisher_github'),
      remove = require('../export/app_description_file_writer').remove,
      router = express.Router(),
      authenticationMiddleware = require('./auth/authentication_middleware');

var userDao = new UserDao();
var userService = new UserService(userDao);

/* Make sur that the user is connected */
router.use(authenticationMiddleware);

router
    .post('/directory', function(req, res){
        var userName = req.body.userName;
        userService.get({ name: userName }, function(err, result){
            publisher.initialPublish(req.body.directory, req.body.repositoryName, userName, result.token);
            res.status(200).send(JSON.stringify(
                {
                    message : 'The directory \''+req.body.directory
                        +'\' has been published in the repository named \''+req.body.repositoryName+'\''
                }
            ));

        });

    });

module.exports = router;