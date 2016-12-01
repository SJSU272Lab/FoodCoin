// To include node modules
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , flash = require('connect-flash')
  , session = require('client-sessions');

//To include local routes

var login = require('./routes/login')
, users = require('./routes/users');
/*, dashboard = require("./routes/dashboard");*/

//To include Mongodb & Express-Session initialization related statements
var mongo = require("./routes/mongo");
var mongoSessionURL = "mongodb://localhost:27017/foodCoin";

///////////////////////////////////////////////////////////
var app = express();
app.use(session({   
	  
	cookieName: 'session',    
	secret: 'cmpe272_Project',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  
}));
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
///////////////////////////////////////////////////////////
// Initialize Express Sessions in Mongo Store

///////////////////////////////////////////////////////////

// Handling Errors
	//catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});
	
	// error handlers
	
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	  app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });
	  });
	}
	
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: {}
	  });
	});

/////////////////////////////////////////////////////////
	
// To handle requests

app.get('/', routes.index);

app.post('/signin', login.signin);



app.post('/signup', users.create);
app.get('/users/new', users.showCreate);
//app.post('/users', users.create);
app.get('/users/:id/verify', users.showVerify);
app.post('/users/verify', users.verify);
app.post('/users/resend', users.resend);
app.get('/users/:id', users.showUser);


var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});  
module.exports = server;