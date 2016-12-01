var User = require('./User');
var bcrypt = require('bcrypt-nodejs');

// Display a form that allows users to sign up for a new account
exports.showCreate = function(request, response) {
    response.render('users/create', {
        title: 'Create User Account',
        // include any errors (success messages not possible for view)
        errors: console.log('errors')
    });
};

// create a new user based on the form submission
exports.create = function(request, response) {
    var params = request.body;
    console.log("In create");
    // Create a new user based on form parameters
    
    User.findOne({"email":params.email}, function(err, user) {
        if (err) {
            // 404
            console.log(err);
            throw err;
        }
        if(user){
        	console.log("User Exists.");
            response.send({"statusCode":404,"error": "User Exists"});
        }
        else{
        	var user = new User({
                fullName: params.fName,
                email: params.email,
                phone: params.phone,
                password: bcrypt.hashSync(params.password),
                fName : params.fname,
				lName : params.lname,
                countryCode: "+1"
            });
            
            user.save(function(err, doc) {
            	console.log("In User Save.");
                if (err) {
                    // To improve on this example, you should include a better
                    // error message, especially around form field validation. But
                    // for now, just indicate that the save operation failed
                    console.log('errors', 'There was a problem creating your'
                        + ' account - note that all fields are required. Please'
                        + ' double-check your input and try again.');

                    response.redirect('/users/new');

                } else {
                    // If the user is created successfully, send them an account
                    // verification token
                    user.sendAuthyToken(function(err) {
                        if (err) {
                            console.log('errors', 'There was a problem sending '
                                + 'your token - sorry :(');
                        }
                        console.log("User Saved and Auth Key Sent.");
                        // Send to token verification page
                        response.send({"id" : doc._id});
                    });
                }
            });
        }
    });
};

// Display a form that allows users to enter a verification token
exports.showVerify = function(request, response) {
    response.render('users/verify', {
        title: 'Verify Phone Number',
        // include any errors
        errors: console.log('errors'),
        // success messsages
        successes: console.log('successes'),
        // Include database ID to include in form POST action
        id: request.params.id
    });
};

// Resend a code if it was not received
exports.resend = function(request, response) {
    // Load user model
	var id = request.param("id");
    var code = request.param("code");
    console.log("id:"+id);
    User.findById(id, function(err, user) {
        if (err || !user) {
            return die('User not found for this ID.');
        }
        console.log("user.authyId:"+user.authyId);
        console.log("user.phone:"+user.phone);
        console.log("user.countryCode:"+user.countryCode);
        // If we find the user, let's send them a new code
        user.sendAuthyToken(postSend);
    });

    // Handle send code response
    function postSend(err) {
        if (err) {
            return die('There was a problem sending you the code - please '
                + 'retry.');
        }

        console.log('successes', 'Code re-sent!');
        response.send({"id" : id});
    }

    // respond with an error
    function die(message) {
        console.log('errors', message);
        response.send({"id" : id, "error":message});
    }
};

// Handle submission of verification token
exports.verify = function(request, response) {
    var user;
    var id = request.param("id");
    var code = request.param("code");
    // Load user model
    console.log("In Verify Code");
    User.findById(id, function(err, doc) {
        if (err || !doc) {
            return die('User not found for this ID.');
        }

        // If we find the user, let's validate the token they entered
        user = doc;
        user.verifyAuthyToken(code, postVerify);
    });

    // Handle verification response
    function postVerify(err) {
        if (err) {
            return die('The token you entered was invalid - please retry.');
        }

        // If the token was valid, flip the bit to validate the user account
        user.verified = true;
        user.save(postSave);
    }

    // after we save the user, handle sending a confirmation
    function postSave(err) {
        if (err) {
            return die('There was a problem validating your account '
                + '- please enter your token again.');
        }

        // Send confirmation text message
        var message = 'You did it! Signup complete :)';
        user.sendMessage(message, function(err) {
            if (err) {
                console.log('errors', 'You are signed up, but '
                    + 'we could not send you a message. Our bad :(');
            }
            console.log("Verification Successful.");
            // show success page
            console.log('successes', message);
            
            User.findById(user.id, function(err, user) {
                if (err || !user) {
                    // 404
                    return next();
                }
                console.log("Validating User.");
                response.send({"statusCode":200,"user": user});
            });
        });
    }
    // respond with an error
    function die(message) {
        console.log('errors', message);
        console.log("Error in Verification.");
        response.send({"statusCode":404,"id": id, "error":message});
    }
};

// Show details about the user
exports.showUser = function(request, response, next) {
    // Load user model
    User.findById(request.params.id, function(err, user) {
        if (err || !user) {
            // 404
            return next();
        }

        response.render('users/show', {
            title: 'Hi there ' + user.fullName + '!',
            user: user,
            // any errors
            errors: console.log('errors'),
            // any success messages
            successes: console.log('successes')
        });
    });
};