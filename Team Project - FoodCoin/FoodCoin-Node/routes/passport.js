/**

 */
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/foodCoin";
var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport) {
	passport.use('login', new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				session: false
			},
			function(username, password, done) {
				
				process.nextTick(function(){
					var json_responses;

					console.log("email:"+username);
					console.log("password:"+password);

					console.log("In POST Request = UserName:"+ username);
					
					mongo.connect(mongoURL, function(){
						console.log('Connected to mongo at: ' + mongoURL);
						var coll = mongo.connectToCollection('users');
						var res = {};
						coll.findOne({email: username}, function(err, user){
							if(err){
								console.log("Error Occured: "+err);
								return done(err);
							}
							
							if (user) {
								console.log("user.password:"+user.password);
								// This way subsequent requests will know the user is logged in.
								if(bcrypt.compareSync(password,user.password)){
									res.code = "200";
									res.value = "Success Login";
									console.log("Succes Login");
									done(null, username);
								}
								else{
									console.log("Invalid Password");
									
									res.code = "404";
									res.value = "Failed Login";
									console.log("Failed Login");
									return done(null, false);
								}
								

							} else {
								console.log("Invalid Username");
								
								res.code = "404";
								res.value = "Failed Login";
								console.log("Failed Login");
								return done(null, false);
							}
						});
					});

				});
			}));
};


