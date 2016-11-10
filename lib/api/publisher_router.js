const express = require('express'),
      AuthenticationException = require('../exception/exceptions').AuthenticationException,
      publisher = require('../publisher/application_publisher_github'),
      router = express.Router();

router
    .post('/directory', function(req, res){
    console.log(req.isAuthenticated());
        if (!req.isAuthenticated()) {
            res.status(500).send(JSON.stringify(
                {
                    error : {
                        code: 500,
                        message: 'An error has occurred: no authentification'
                    }
                }
            ));
        }

        publisher.initialPublish(req.body.directory, req.body.repositoryName);
        res.status(200).send(JSON.stringify(
            {
                message : 'The directory \''+req.body.directory
                    +'\' has been published in the repository named \''+req.body.repositoryName+'\''
            }
        ));
    });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/github')
}

module.exports = router;