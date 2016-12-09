// To include node modules
var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , flash = require('connect-flash')
  , session = require('client-sessions')
  , multer  = require('multer')
  , Parse = require('csv-parse')
  , fs = require('fs');;

//To include local routes

var login = require('./routes/login')
, users = require('./routes/users')
, pAanalytics = require('./routes/PredictionAnalysis')
, data = require('./routes/data');
/*, dashboard = require("./routes/dashboard");*/

//To include Mongodb & Express-Session initialization related statements
var mongo = require("./routes/mongo");
// var mongoSessionURL = "mongodb://localhost:27017/foodCoin";
var mongoSessionURL = "mongodb://foodcoin:foodcoin@ds119578.mlab.com:19578/foodcoin";


///////////////////////////////////////////////////////////
var  dataArr =[];
var upload=multer({dest:'upload/.'});
//////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////


app.all('/', function(req, res, next) {
    // res.type('json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type, Accept, 'application/json'");
    next();
});

/////////////////////////////////////////////////////////
	
// To handle requests

app.get('/', routes.index);

app.post('/signin', login.signin);
//app.post('/logout', login.logout);



app.post('/signup', users.create);
app.get('/users/new', users.showCreate);
//app.post('/users', users.create);
app.get('/users/:id/verify', users.showVerify);
app.post('/users/verify', users.verify);
app.post('/users/resend', users.resend);
app.get('/users/:id', users.showUser);
app.post('/data',pAanalytics.insertData);
app.post('/result',pAanalytics.predictRes);
app.post('/getResData',pAanalytics.getResData);


app.post('/uploadCSV',upload.single('file'), function (req,res) {

    console.log(req.file);
      dataArr =[];
    parseFile(req,res);
});

function parseCSVFile(sourceFilePath, columns, onNewRecord, handleError, done){
    var source = fs.createReadStream(sourceFilePath);

    var linesRead = 0;

    var parser = Parse({
        delimiter: ',',
        columns:columns
    });

    parser.on("readable", function(){
        var record;
        while (record = parser.read()) {
            linesRead++;

            onNewRecord(record);
        }
    });

    parser.on("error", function(error){
        handleError(error)
    });

    parser.on("end", function(){
        done(linesRead);
    });

    source.pipe(parser);
}

//We will call this once Multer's middleware processed the request
//and stored file in req.files.fileFormFieldName

function parseFile(req, res, next){
    var filePath = req.file.path;
    console.log(filePath);

    function onNewRecord(record){
        dataArr.push(record);
        console.log(record)
    }

    function onError(error){
        console.log(error)
    }

    function done(linesRead){
        res.send(200, dataArr)
    }

    var columns = true;
    parseCSVFile(filePath, columns, onNewRecord, onError, done);

}


var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});  
module.exports = server;