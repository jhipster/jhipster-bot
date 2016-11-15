const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        passport = require('./auth/auth_github').passport,
        generatorRouter = require('./generator_router'),
        publisherRouter = require('./publisher_router'),
        userRouter = require('./user_router')
        authRouter = require('./auth/auth_github').router,
        session = require('express-session');


var port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'secret session',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Error Handling
app.use(function(err, req, res, next){
    res.status(500).send(JSON.stringify(
        {
            error : {
                code: 500,
                message: 'An error has occurred: '+ err
            }
        }
    ));
});

app.get('/login',
  function(req, res){
    res.send('login');
  });

app.use('/generator', generatorRouter);
app.use('/publisher', publisherRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);


var api = app.listen(port, function(){
    console.log('************');
    console.log('The JHipster application generator has started on the port: '+port);
    console.log('************');
});

module.exports = api;