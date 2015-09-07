var express = require('express');
var app     = express();

// Set up routes in app.js
var setupAppRoutes = require('./lib/app/routes');
setupAppRoutes(app);

// Tell app where to look for views, tell it we're using Jade
var path = require('path');
app.set('views', path.join(__dirname, 'lib', 'views'));
app.set('view engine', 'jade');

// Tell our all the client side js is in lib
app.use(express.static(path.join(__dirname, 'lib')));

var server = app.listen(process.env.PORT || 3000, function(){
 console.log('Express server listening on port 3000');
});