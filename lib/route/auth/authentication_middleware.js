var AuthenticationException = require('../../exception/exceptions').AuthenticationException;


function authenticationMiddleware (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.status(401).send(JSON.stringify(
        {
            error : {
                code: 401,
                message: 'An error has occurred: '+ new AuthenticationException()
            }
        }
    ));
    return
 }

module.exports = authenticationMiddleware;