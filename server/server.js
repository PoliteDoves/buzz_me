var express = require('express');
var bodyParser= require('body-parser');
var path= require('path');
var morgan = require('morgan');
var db = require('../database/schemas.js');
var app = express();
var port = process.env.PORT || 3021;

var allowCrossDomain = function(req, res, next) {
    if ('OPTIONS' == req.method) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

//require('./config/routes.js')(app, express);

app.listen(port, function() {
  console.log('Listening on ' + port);
});

module.exports = {
  app: app,
};
