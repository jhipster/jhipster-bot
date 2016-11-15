const express = require('express'),
      AuthenticationException = require('../exception/exceptions').AuthenticationException,
      publisher = require('../publisher/application_publisher_github'),
      router = express.Router(),
      authenticationMiddleware = require('./auth/authentication_middleware');

/* Make sur that the user is connected */
router.use(authenticationMiddleware);

router
    .post('/directory', function(req, res){
        if (!req.isAuthenticated()) {
            res.status(500).send(JSON.stringify(
                {
                    error : {
                        code: 500,
                        message: 'An error has occurred: no authentication'
                    }
                }
            ));
        } else {
            publisher.initialPublish(req.body.directory, req.body.repositoryName);
            res.status(200).send(JSON.stringify(
                {
                    message : 'The directory \''+req.body.directory
                        +'\' has been published in the repository named \''+req.body.repositoryName+'\''
                }
            ));
        }
    });

module.exports = router;