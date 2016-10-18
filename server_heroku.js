'user strict';

var http = require('http');

module.exports = {
    start : function(){
        var port = process.env.PORT || 5000;
        http.createServer(function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.send('it is running\n');
        }).listen(port);

        console.log("The heroku server is on the port "+port);
    }
};