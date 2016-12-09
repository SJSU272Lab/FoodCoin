var cfg = {};

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || 'keyboard cat';

// Your Twilio account SID and auth token, both found at:
// https://www.twilio.com/user/account
// 
// A good practice is to store these string values as system environment
// variables, and load them from there as we are doing below. Alternately,
// you could hard code these values here as strings.
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID || "AC7ec98dc94fbe5849289b5b7752c3ceba";
cfg.authToken = process.env.TWILIO_AUTH_TOKEN || "aaaa9994378b7d0456a5d2ea14f277d3";

// A Twilio number you control - choose one from:
// https://www.twilio.com/user/account/phone-numbers/incoming
// Specify in E.164 format, e.g. "+16519998877"
cfg.twilioNumber = process.env.TWILIO_NUMBER || "+16692655143";

// Your Authy production key - this can be found on the dashboard for your 
// Authy application
cfg.authyKey = process.env.AUTHY_API_KEY || "RSoDAdnbvULzHxn0jCYrcNv9yooTBw3S";

// MongoDB connection string - MONGO_URL is for local dev,
// MONGOLAB_URI is for the MongoLab add-on for Heroku deployment
// cfg.mongoUrl = process.env.MONGOLAB_URI || process.env.MONGO_URL || "mongodb://localhost:27017/foodCoin";

cfg.mongoUrl = process.env.MONGO_URL || "mongodb://foodcoin:foodcoin@ds119578.mlab.com:19578/foodcoin";




// Export configuration object
module.exports = cfg;