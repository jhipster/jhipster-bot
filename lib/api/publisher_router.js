const express = require('express'),
      publisher = require('../publisher/application_publisher_github'),
      router = express.Router();

router
    .post('/directory', function(req, res){
        publisher.initialPublish(req.body.directory, req.body.repositoryName);

        res.status(200).send(JSON.stringify(
            {
                message : 'The directory \''+req.body.directory
                    +'\' has been published in the repository named \''+req.body.repositoryName+'\''
            }
        ));
    });

module.exports = router;