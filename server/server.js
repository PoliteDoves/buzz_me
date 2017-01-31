var express = require('express');
var bodyParser= require('body-parser');
var path= require('path');
var morgan = require('morgan');
var db = require('../database/schemas.js');
var app = express();
var port = process.env.PORT || 3021;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../node_modules'));

require('./config/routes.js')(app, express, db);

app.listen(port, function() {
  console.log('Listening on ' + port);
});

module.exports = {
  app: app,
};
