var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var mongoose = require('mongoose'); 				// mongoose for mongodb
var passport = require('passport');
var database = require('./config/database'); 			// load the database config
var session = require('express-session');
var bodyParser = require('body-parser');
var requireDir = require('require-dir');
var RedisStore = require('connect-redis')(session);
var compression = require('compression');

//MongoDB Configuration
mongoose.Promise = global.Promise;
mongoose.connect(database.localUrl);

var app = express();
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(compression());

//Express-Session Configuration
app.use(session({
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({pass: "Kajmerap123.", host: "198.199.126.151", port: 6379}),
  secret: 'nomorelie'
}));

//Passportjs Configuration
require('./config/passport')(passport); // pass passport for configuration
app.use(passport.initialize({}));
app.use(passport.session({})); // persistent login sessions

var project = {};
global.project = project;
project.app = app;
project.passport = passport;
project.util = {
  isLoggedIn: require('./util/isLoggedIn'),
  isAdmin: require('./util/isAdmin')
};

requireDir('./api', {recurse: true});

//Build klasörü varsa oradan başlat yoksa normal başlat
try {
  fs.accessSync('./client/build');
  app.use(express.static('./client/build'));
  app.use(express.static('./client/app'));
} catch (e) {
  app.use(express.static('./client'));
  app.use(express.static('./client/app'));
}

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
