const   express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        generatorRouter = require('./generator_router'),
        publisherRouter = require('./publisher_router'),
        userRouter = require('./user_router');


var port = process.env.PORT || 5000;

app.use(bodyParser.json());
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

app.use('/generator', generatorRouter);
app.use('/publisher', publisherRouter);
app.use('/', userRouter);

var api = app.listen(port, function(){
    console.log('************');
    console.log('The JHipster application generator has started on the port: '+port);
    console.log('************');
});

module.exports = api;