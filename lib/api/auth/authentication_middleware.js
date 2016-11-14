var AuthenticationException = require('../../exception/exceptions').AuthenticationException;


function authenticationMiddleware (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(500).send(JSON.stringify(
        {
            error : {
                code: 500,
                message: 'An error has occurred: '+ new AuthenticationException()
            }
        }
    ));
    return
 }

module.exports = authenticationMiddleware;