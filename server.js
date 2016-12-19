'use strict';
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      logger = require('morgan'),
      passport = require('./lib/route/auth/auth_github').passport,
      generatorRouter = require('./lib/route/generator_router'),
      publisherRouter = require('./lib/route/publisher_router'),
      userRouter = require('./lib/route/user_router')
      authRouter = require('./lib/route/auth/auth_github').router,
      session = require('express-session');


var port = process.env.PORT || 5000;

// App Configuration
app.use(express.static(path.join(__dirname, '.tmp')));
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', __dirname + '/app/views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));

app.use(cookieParser());

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


 // Angular Routes
app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
});

app.get('/*', function(req, res) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user));
    }

    res.render('index.html');
});

var api = function() {
    app.listen(port, function(){
        console.log('************\n'
        +'The JHipster application generator has started on the port: '+port
        + '\n************');
    });
}
api();
