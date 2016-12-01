// Without Connection Pooling
/*
var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
var mongoURL = "mongodb://localhost:27017/ebay";
var connectionsInPool = [];
var connection;
var c = 0;
// Create 500 Connections in Pool

for(var i = 0; i < 500; i++){
	c++;
	MongoClient.connect(mongoURL, function(err, _db){
	      if (err) { throw new Error('Could not connect: '+err); }
	      var connection = _db;
	      connected = true;
	      connectionsInPool.push(connection);
	    });
}

function getConnection(){
	console.log("Number of Connections in Pool: "+ connectionsInPool.length);
	if(connectionsInPool.length > 0){
		connection = connectionsInPool.pop();
		console.log("Connections left in Pool: "+ connectionsInPool.length);
		return connection;
	}
	else{
		setInterval(function(){
			console.log("Connections left in Pool: "+ connectionsInPool.length);
			console.log("No Connection in Pool");
			getConnection(); 
		}, 1);
	}
}

function returnConnectionToPool(){
	console.log("Number of Connections in before Pushing in Pool: "+ connectionsInPool.length);
	connectionsInPool.push(db);
	console.log("Connections Added to Pool. Now No. in Pool: "+ connectionsInPool.length);
}

exports.returnConnectionToPool = returnConnectionToPool;

exports.connect = function(url, callback){
	db = getConnection();
    callback(db);
};

*/
//Without Connection Pooling
var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;

/**
 * Connects to the MongoDB Database with the provided URL
 */
exports.connect = function(url, callback){
    MongoClient.connect(url, function(err, _db){
      if (err) { throw new Error('Could not connect: '+err); }
      db = _db;
      connected = true;
      console.log(connected +" is connected?");
      callback(null,db);
    });
};

/**
 * Returns the collection on the selected database
 */
exports.connectToCollection = function(name){
    if (!connected) {
      throw new Error('Must connect to Mongo before calling "collection"');
    } 
    return db.collection(name);
  
};