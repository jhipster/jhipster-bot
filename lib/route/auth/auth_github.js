var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var express = require('express');
var authRouter = express.Router();
var UserService = require('../../service/user_service');
var UserDao = require('../../dao/userDAO_postgre');

var userDao = new UserDao();
var userService = new UserService(userDao);

var GITHUB_BOT_ID = require('../../configuration').git_client_id;
var GITHUB_BOT_SECRET = require('../../configuration').git_client_secret;

var port = process.env.PORT || 5000;
//Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
    userService.createOrUpdate(user, function(err, result){
        if(err){
            done(err, null);
        }
    });

    process.nextTick(function() {
        return done(null, user);
    });

});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.
passport.use(new GitHubStrategy({
    clientID: GITHUB_BOT_ID,
    clientSecret: GITHUB_BOT_SECRET,
    callbackURL: "http://localhost:9000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // To keep the example simple, the user's GitHub profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the GitHub account with a user record in your database,
    // and return that user instead.
    var user = {
      name : profile.username,
      token : accessToken
    };
    return done(null, user);
  }
));


// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
authRouter.get('/github',
  passport.authenticate('github', {scope: ['public_repo', 'user:email']}));

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
authRouter.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login'}),
  function(req, res) {
    res.cookie('user', JSON.stringify(req.user));

    res.writeHead(302, {
        'Location': 'http://localhost:9000/logged'
    });
    res.end();
  });

module.exports = {
    passport : passport,
    router : authRouter
}