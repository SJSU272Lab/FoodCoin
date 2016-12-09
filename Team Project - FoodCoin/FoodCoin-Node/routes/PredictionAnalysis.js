/**
 * Created by Mak on 11/28/16.
 */
var mongo = require('./mongo');
// var geolib = require('geolib');
// var NaiveBayes = require('naivebayes-predictor');
// var mongoURL = "mongodb://localhost:27017/foodCoin"
var mongoURL='mongodb://foodcoin:foodcoin@ds119578.mlab.com:19578/foodcoin'

var selectedRes=[];
var ResInfo =[];
var restaurant ={};
var f ={};

mongo.connect(mongoURL,function(connection) { console.log("Connected to the mongo")});
function insertData(req,res)
{

    var city = req.body.city;
    var state = req.body.state;
    var type = req.body.type;

    mongo.connect(mongoURL,function(connection) {
        var coll = mongo.connectToCollection('business');




        console.log("Hello form prediction analytics");

        coll.find({'city': city, 'categories': {$regex: 'Restaurants', $regex: type}}).toArray(function (err, result) {

            if (err)
                throw err;
            console.log(result.length);

            for (re in result) {
                // console.log(result[res].business_id);
                ResInfo.push(result[re]);
                //console.log(result[res].business_id);
                //restaurant.info=result[res];

                //console.log(restaurant);

                getData(re, result,req.body.type);
               // console.log(selectedRes);
            }
            res.send("success");
            //console.log(JSON.stringify(selectedRes));
            // console.log(JSON.stringify(ResInfo));
        });

    });
}




function getData(res, result,type)

{


    mongo.connect(mongoURL,function(connection) {
        var coll1 = mongo.connectToCollection('Checkin');
        coll1.findOne({'business_id': result[res].business_id}, function (error, data) {

            if (error)
                throw error;

            if (data != null) {

                crunchData(data, result[res],type);
                connection.close();
            }


        });

    });
}

function crunchData (data ,res,type)

{


    if(data.checkin_info) {
        var z = data.checkin_info;
        var dhaba={};
        var f={};
        var city =res.city;
        var state = res.state;
        var longitude = res.longitude;
        var latitude= res.latitude;
        var stars = res.stars;
        var business_id = res.business_id;
        var  name = res.name;
         dhaba.saturday =0;
         dhaba.friday =0;
         dhaba.monday=0;
         dhaba.tuesday=0;
         dhaba.wednesday=0;
         dhaba.thursday=0;
         dhaba.sunday=0;
        for(a in z)
        {

           // console.log(a);
            // checkIf(res, data,a,z);
            if(res.business_id==data.business_id)
            {
                dhaba.businessId=data.business_id;

                if (a == '0-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 12 am : No of customer ", z[a]);
                    dhaba.tuesdayAt12Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '1-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 1 am : No of customer ", z[a]);
                    dhaba.tuesdayAt1Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '2-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 2 am : No of customer ", z[a]);
                    dhaba.tuesdayAt2Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '3-2') {
                    ///console.log("FOR Restaurant "+data.business_id+"Tuesday 2 am : No of customer ", z[a]);
                    dhaba.tuesdayAt3Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '4-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 3 am : No of customer ", z[a]);
                    dhaba.tuesdayAt4Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '5-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 4 am : No of customer ", z[a]);
                    dhaba.tuesdayAt5Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '6-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 5 am : No of customer ", z[a]);
                    dhaba.tuesdayAt6Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '7-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 6 am : No of customer ", z[a]);
                    dhaba.tuesdayAt7Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '8-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 7 am : No of customer ", z[a]);
                    dhaba.tuesdayAt8Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '9-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 8 am : No of customer ", z[a]);
                    dhaba.tuesdayAt9Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '10-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 9 am : No of customer ", z[a]);
                    dhaba.tuesdayAt10Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '11-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 10 am : No of customer ", z[a]);
                    dhaba.tuesdayAt11Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '12-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 11 am : No of customer ", z[a]);
                    dhaba.tuesdayAt12Am=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '13-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 12 am : No of customer ", z[a]);
                    dhaba.tuesdayAt1Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '14-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 13 am : No of customer ", z[a]);
                    dhaba.tuesdayAt2Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '15-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 14 am : No of customer ", z[a]);
                    dhaba.tuesdayAt3Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '16-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 15 am : No of customer ", z[a]);
                    dhaba.tuesdayAt4Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '17-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 16 am : No of customer ", z[a]);
                    dhaba.tuesdayAt5Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '18-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 17 am : No of customer ", z[a]);
                    dhaba.tuesdayA6Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '19-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 18 am : No of customer ", z[a]);
                    dhaba.tuesdayAt7Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '20-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 19 am : No of customer ", z[a]);
                    dhaba.tuesdayAt8Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '21-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 20 am : No of customer ", z[a]);
                    dhaba.tuesdayAt9Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '22-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 21 am : No of customer ", z[a]);
                    dhaba.tuesdayAt10Pm=z[a];
                    dhaba.tuesday+=z[a];
                }
                if (a == '23-2') {
                    //console.log("FOR Restaurant "+data.business_id+"Tuesday 22 am : No of customer ", z[a]);
                    dhaba.tuesdayAt11Pm=z[a];
                    dhaba.tuesday+=z[a];
                }

                if (a == '0-3') {

                    dhaba.wednesdayAt12Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '1-3') {

                    dhaba.wednesdayAt1Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '2-3') {

                    dhaba.wednesdayAt2Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '3-3') {

                    dhaba.wednesdayAt3Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '4-3') {

                    dhaba.wednesdayAt4Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '5-3') {

                    dhaba.wednesdayAt5Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '6-3') {

                    dhaba.wednesdayAt6Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '7-3') {

                    dhaba.wednesdayAt7Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '8-3') {

                    dhaba.wednesdayAt8Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '9-3') {

                    dhaba.wednesdayAt9Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '10-3') {

                    dhaba.wednesdayAt10Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '11-3') {

                    dhaba.wednesdayAt11Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '12-3') {

                    dhaba.wednesdayAt12Am=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '13-3') {

                    dhaba.wednesdayAt1Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '14-3') {

                    dhaba.wednesdayAt2Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '15-3') {

                    dhaba.wednesdayAt3Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '16-3') {

                    dhaba.wednesdayAt4Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '17-3') {

                    dhaba.wednesdayAt5Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '18-3') {

                    dhaba.wednesdayA6Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '19-3') {

                    dhaba.wednesdayAt7Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '20-3') {

                    dhaba.wednesdayAt8Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '21-3') {

                    dhaba.wednesdayAt9Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '22-3') {

                    dhaba.wednesdayAt10Pm=z[a];
                    dhaba.wednesday+=z[a];
                }
                if (a == '23-3') {

                    dhaba.wednesdayAt11Pm=z[a];
                    dhaba.wednesday+=z[a];
                }

                if (a == '0-4') {

                    dhaba.thursdayAt12Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '1-4') {

                    dhaba.thursdayAt1Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '2-4') {

                    dhaba.thursdayAt2Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '3-4') {

                    dhaba.thursdayAt3Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '4-4') {

                    dhaba.thursdayAt4Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '5-4') {

                    dhaba.thursdayAt5Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '6-4') {

                    dhaba.thursdayAt6Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '7-4') {

                    dhaba.thursdayAt7Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '8-4') {

                    dhaba.thursdayAt8Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '9-4') {

                    dhaba.thursdayAt9Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '10-4') {

                    dhaba.thursdayAt10Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '11-4') {

                    dhaba.thursdayAt11Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '12-4') {

                    dhaba.thursdayAt12Am=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '13-4') {

                    dhaba.thursdayAt1Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '14-4') {

                    dhaba.thursdayAt2Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '15-4') {

                    dhaba.thursdayAt3Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '16-4') {

                    dhaba.thursdayAt4Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '17-4') {

                    dhaba.thursdayAt5Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '18-4') {

                    dhaba.thursdayA6Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '19-4') {

                    dhaba.thursdayAt7Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '20-4') {

                    dhaba.thursdayAt8Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '21-4') {

                    dhaba.thursdayAt9Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '22-4') {

                    dhaba.thursdayAt10Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '23-4') {

                    dhaba.thursdayAt11Pm=z[a];
                    dhaba.thursday+=z[a];
                }
                if (a == '0-5') {

                    dhaba.fridayAt12Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '1-5') {

                    dhaba.fridayAt1Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '2-5') {

                    dhaba.fridayAt2Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '3-5') {

                    dhaba.fridayAt3Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '4-5') {

                    dhaba.fridayAt4Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '5-5') {

                    dhaba.fridayAt5Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '6-5') {

                    dhaba.fridayAt6Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '7-5') {

                    dhaba.fridayAt7Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '8-5') {

                    dhaba.fridayAt8Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '9-5') {

                    dhaba.fridayAt9Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '10-5') {

                    dhaba.fridayAt10Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '11-5') {

                    dhaba.fridayAt11Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '12-5') {

                    dhaba.fridayAt12Am=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '13-5') {

                    dhaba.fridayAt1Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '14-5') {

                    dhaba.fridayAt2Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '15-5') {

                    dhaba.fridayAt3Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '16-5') {

                    dhaba.fridayAt4Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '17-5') {

                    dhaba.fridayAt5Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '18-5') {

                    dhaba.fridayA6Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '19-5') {

                    dhaba.fridayAt7Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '20-5') {

                    dhaba.fridayAt8Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '21-5') {

                    dhaba.fridayAt9Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '22-5') {

                    dhaba.fridayAt10Pm=z[a];
                    dhaba.friday+=z[a];
                }
                if (a == '23-5') {

                    dhaba.fridayAt11Pm=z[a];
                    dhaba.friday+=z[a];
                }

                if (a == '0-6') {

                    dhaba.saturdayAt12Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '1-6') {

                    dhaba.saturdayAt1Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '2-6') {

                    dhaba.saturdayAt2Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '3-6') {

                    dhaba.saturdayAt3Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '4-6') {

                    dhaba.saturdayAt4Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '5-6') {

                    dhaba.saturdayAt5Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '6-6') {

                    dhaba.saturdayAt6Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '7-6') {

                    dhaba.saturdayAt7Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '8-6') {

                    dhaba.saturdayAt8Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '9-6') {

                    dhaba.saturdayAt9Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '10-6') {

                    dhaba.saturdayAt10Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '11-6') {

                    dhaba.saturdayAt11Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '12-6') {

                    dhaba.saturdayAt12Am=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '13-6') {

                    dhaba.saturdayAt1Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '14-6') {

                    dhaba.saturdayAt2Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '15-6') {

                    dhaba.saturdayAt3Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '16-6') {

                    dhaba.saturdayAt4Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '17-6') {

                    dhaba.saturdayAt5Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '18-6') {

                    dhaba.saturdayA6Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '19-6') {

                    dhaba.saturdayAt7Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '20-6') {

                    dhaba.saturdayAt8Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '21-6') {

                    dhaba.saturdayAt9Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '22-6') {

                    dhaba.saturdayAt10Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '23-6') {

                    dhaba.saturdayAt11Pm=z[a];
                    dhaba.saturday+=z[a];
                }
                if (a == '0-1') {

                    dhaba.mondayAt12Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '1-1') {

                    dhaba.mondayAt1Am=z[a];
                    dhaba.monday+=z[a];

                }
                if (a == '2-1') {

                    dhaba.mondayAt2Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '3-1') {

                    dhaba.mondayAt3Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '4-1') {

                    dhaba.mondayAt4Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '5-1') {

                    dhaba.mondayAt5Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '6-1') {

                    dhaba.mondayAt6Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '7-1') {

                    dhaba.mondayAt7Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '8-1') {

                    dhaba.mondayAt8Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '9-1') {

                    dhaba.mondayAt9Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '10-1') {

                    dhaba.mondayAt10Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '11-1') {

                    dhaba.mondayAt11Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '12-1') {

                    dhaba.mondayAt12Am=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '13-1') {

                    dhaba.mondayAt1Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '14-1') {

                    dhaba.mondayAt2Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '15-1') {

                    dhaba.mondayAt3Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '16-1') {

                    dhaba.mondayAt4Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '17-1') {

                    dhaba.mondayAt5Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '18-1') {

                    dhaba.mondayA6Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '19-1') {

                    dhaba.mondayAt7Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '20-1') {

                    dhaba.mondayAt8Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '21-1') {

                    dhaba.mondayAt9Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '22-1') {

                    dhaba.mondayAt10Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '23-1') {

                    dhaba.mondayAt11Pm=z[a];
                    dhaba.monday+=z[a];
                }
                if (a == '0-0') {

                    dhaba.sundayAt12Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '1-0') {

                    dhaba.sundayAt1Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '2-0') {

                    dhaba.sundayAt2Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '3-0') {

                    dhaba.sundayAt3Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '4-0') {

                    dhaba.sundayAt4Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '5-0') {

                    dhaba.sundayAt5Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '6-0') {

                    dhaba.sundayAt6Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '7-0') {

                    dhaba.sundayAt7Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '8-0') {

                    dhaba.sundayAt8Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '9-0') {

                    dhaba.sundayAt9Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '10-0') {

                    dhaba.sundayAt10Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '11-0') {

                    dhaba.sundayAt11Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '12-0') {

                    dhaba.sundayAt12Am=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '13-0') {

                    dhaba.sundayAt1Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '14-0') {

                    dhaba.sundayAt2Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '15-0') {

                    dhaba.sundayAt3Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '16-0') {

                    dhaba.sundayAt4Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '17-0') {

                    dhaba.sundayAt5Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '18-0') {

                    dhaba.sundayA6Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '19-0') {

                    dhaba.sundayAt7Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '20-0') {

                    dhaba.sundayAt8Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '21-0') {

                    dhaba.sundayAt9Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '22-0') {

                    dhaba.sundayAt10Pm=z[a];
                    dhaba.sunday+=z[a];
                }
                if (a == '23-0') {

                    dhaba.sundayAt11Pm=z[a];
                    dhaba.sunday+=z[a];
                }


            }

            console.log(restaurant);

        }
        dhaba.type=type;
        dhaba.name = name;
        dhaba.city=city;
        dhaba.state=state;
        dhaba.longitude=longitude;
        dhaba.latitude=latitude;
        dhaba.businessId =business_id;
        dhaba.rating =stars;


        //selectedRes.push(restaurant);
        pushdata(dhaba);
        //console.log("restaurant",selectedRes);

    }

}

function pushdata(res)
{
    var coll3 = mongo.collection('predictData1');
    coll3.insert(res,function (err,resul) {

    });
}


function predictRes(req , res)
{

    // mongo.connect(mongoURL,function( conne){


    var averageColl = mongo.connectToCollection("predictData1");

    averageColl.aggregate([{$match:{type:req.body.type,city:req.body.city}},{$group:{_id:'$type',

        totalFriday:{$avg:'$friday'},
        totalSaturday:{$avg:'$saturday'},
        totalSunday:{$avg:'$sunday'},
        totalMonday:{$avg:'$monday'},
        totalTuesday:{$avg:'$tuesday'},
        totalWednesday:{$avg:'$wednesday'},
        totalThursday:{$avg:'$thursday'},
        totalTuesdayAt1Am:{$avg:'$tuesdayAt1Am'},
        totalTuesdayAt2Am:{$avg:'$tuesdayAt2Am'},
        totalTuesdayAt3Am:{$avg:'$tuesdayAt3Am'},
        totalTuesdayAt4Am:{$avg:'$tuesdayAt4Am'},
        totalTuesdayAt5Am:{$avg:'$tuesdayAt5Am'},
        totalTuesdayAt6Am:{$avg:'$tuesdayAt6Am'},
        totalTuesdayAt7Am:{$avg:'$tuesdayAt7Am'},
        totalTuesdayAt8Am:{$avg:'$tuesdayAt8Am'},
        totalTuesdayAt9Am:{$avg:'$tuesdayAt9Am'},
        totalTuesdayAt10Am:{$avg:'$tuesdayAt10Am'},
        totalTuesdayAt11Am:{$avg:'$tuesdayAt11Am'},
        totalTuesdayAt12Pm:{$avg:'$tuesdayAt12Pm'},
        totalTuesdayAt1Pm:{$avg:'$tuesdayAt1Pm'},
        totalTuesdayAt2Pm:{$avg:'$tuesdayAt2Pm'},
        totalTuesdayAt3Pm:{$avg:'$tuesdayAt3Pm'},
        totalTuesdayAt4Pm:{$avg:'$tuesdayAt4Pm'},
        totalTuesdayAt5Pm:{$avg:'$tuesdayAt5Pm'},
        totalTuesdayAt6Pm:{$avg:'$tuesdayAt6Pm'},
        totalTuesdayAt7Pm:{$avg:'$tuesdayAt7Pm'},
        totalTuesdayAt8Pm:{$avg:'$tuesdayAt8Pm'},
        totalTuesdayAt9Pm:{$avg:'$tuesdayAt9Pm'},
        totalTuesdayAt10Pm:{$avg:'$tuesdayAt10Pm'},
        totalTuesdayAt11Pm:{$avg:'$tuesdayAt11Pm'},
        totalWednesdayAt1Am:{$avg:'$wednesdayAt1Am'},
        totalWednesdayAt2Am:{$avg:'$wednesdayAt2Am'},
        totalWednesdayAt3Am:{$avg:'$wednesdayAt3Am'},
        totalWednesdayAt4Am:{$avg:'$wednesdayAt4Am'},
        totalWednesdayAt5Am:{$avg:'$wednesdayAt5Am'},
        totalWednesdayAt6Am:{$avg:'$wednesdayAt6Am'},
        totalWednesdayAt7Am:{$avg:'$wednesdayAt7Am'},
        totalWednesdayAt8Am:{$avg:'$wednesdayAt8Am'},
        totalWednesdayAt9Am:{$avg:'$wednesdayAt9Am'},
        totalWednesdayAt10Am:{$avg:'$wednesdayAt10Am'},
        totalWednesdayAt11Am:{$avg:'$wednesdayAt11Am'},
        totalWednesdayAt12Pm:{$avg:'$wednesdayAt12Pm'},
        totalWednesdayAt1Pm:{$avg:'$wednesdayAt1Pm'},
        totalWednesdayAt2Pm:{$avg:'$wednesdayAt2Pm'},
        totalWednesdayAt3Pm:{$avg:'$wednesdayAt3Pm'},
        totalWednesdayAt4Pm:{$avg:'$wednesdayAt4Pm'},
        totalWednesdayAt5Pm:{$avg:'$wednesdayAt5Pm'},
        totalWednesdayAt6Pm:{$avg:'$wednesdayAt6Pm'},
        totalWednesdayAt7Pm:{$avg:'$wednesdayAt7Pm'},
        totalWednesdayAt8Pm:{$avg:'$wednesdayAt8Pm'},
        totalWednesdayAt9Pm:{$avg:'$wednesdayAt9Pm'},
        totalWednesdayAt10Pm:{$avg:'$wednesdayAt10Pm'},
        totalWednesdayAt11Pm:{$avg:'$wednesdayAt11Pm'},
        totalThursdayAt1Am:{$avg:'$thursdayAt1Am'},
        totalThursdayAt2Am:{$avg:'$thursdayAt2Am'},
        totalThursdayAt3Am:{$avg:'$thursdayAt3Am'},
        totalThursdayAt4Am:{$avg:'$thursdayAt4Am'},
        totalThursdayAt5Am:{$avg:'$thursdayAt5Am'},
        totalThursdayAt6Am:{$avg:'$thursdayAt6Am'},
        totalThursdayAt7Am:{$avg:'$thursdayAt7Am'},
        totalThursdayAt8Am:{$avg:'$thursdayAt8Am'},
        totalThursdayAt9Am:{$avg:'$thursdayAt9Am'},
        totalThursdayAt10Am:{$avg:'$thursdayAt10Am'},
        totalThursdayAt11Am:{$avg:'$thursdayAt11Am'},
        totalThursdayAt12Pm:{$avg:'$thursdayAt12Pm'},
        totalThursdayAt1Pm:{$avg:'$thursdayAt1Pm'},
        totalThursdayAt2Pm:{$avg:'$thursdayAt2Pm'},
        totalThursdayAt3Pm:{$avg:'$thursdayAt3Pm'},
        totalThursdayAt4Pm:{$avg:'$thursdayAt4Pm'},
        totalThursdayAt5Pm:{$avg:'$thursdayAt5Pm'},
        totalThursdayAt6Pm:{$avg:'$thursdayAt6Pm'},
        totalThursdayAt7Pm:{$avg:'$thursdayAt7Pm'},
        totalThursdayAt8Pm:{$avg:'$thursdayAt8Pm'},
        totalThursdayAt9Pm:{$avg:'$thursdayAt9Pm'},
        totalThursdayAt10Pm:{$avg:'$thursdayAt10Pm'},
        totalThursdayAt11Pm:{$avg:'$thursdayAt11Pm'},
        totalFridayAt1Am:{$avg:'$fridayAt1Am'},
        totalFridayAt2Am:{$avg:'$fridayAt2Am'},
        totalFridayAt3Am:{$avg:'$fridayAt3Am'},
        totalFridayAt4Am:{$avg:'$fridayAt4Am'},
        totalFridayAt5Am:{$avg:'$fridayAt5Am'},
        totalFridayAt6Am:{$avg:'$fridayAt6Am'},
        totalFridayAt7Am:{$avg:'$fridayAt7Am'},
        totalFridayAt8Am:{$avg:'$fridayAt8Am'},
        totalFridayAt9Am:{$avg:'$fridayAt9Am'},
        totalFridayAt10Am:{$avg:'$fridayAt10Am'},
        totalFridayAt11Am:{$avg:'$fridayAt11Am'},
        totalFridayAt12Pm:{$avg:'$fridayAt12Pm'},
        totalFridayAt1Pm:{$avg:'$fridayAt1Pm'},
        totalFridayAt2Pm:{$avg:'$fridayAt2Pm'},
        totalFridayAt3Pm:{$avg:'$fridayAt3Pm'},
        totalFridayAt4Pm:{$avg:'$fridayAt4Pm'},
        totalFridayAt5Pm:{$avg:'$fridayAt5Pm'},
        totalFridayAt6Pm:{$avg:'$fridayAt6Pm'},
        totalFridayAt7Pm:{$avg:'$fridayAt7Pm'},
        totalFridayAt8Pm:{$avg:'$fridayAt8Pm'},
        totalFridayAt9Pm:{$avg:'$fridayAt9Pm'},
        totalFridayAt10Pm:{$avg:'$fridayAt10Pm'},
        totalFridayAt11Pm:{$avg:'$fridayAt11Pm'},
        totalSaturdayAt1Am:{$avg:'$saturdayAt1Am'},
        totalSaturdayAt2Am:{$avg:'$saturdayAt2Am'},
        totalSaturdayAt3Am:{$avg:'$saturdayAt3Am'},
        totalSaturdayAt4Am:{$avg:'$saturdayAt4Am'},
        totalSaturdayAt5Am:{$avg:'$saturdayAt5Am'},
        totalSaturdayAt6Am:{$avg:'$saturdayAt6Am'},
        totalSaturdayAt7Am:{$avg:'$saturdayAt7Am'},
        totalSaturdayAt8Am:{$avg:'$saturdayAt8Am'},
        totalSaturdayAt9Am:{$avg:'$saturdayAt9Am'},
        totalSaturdayAt10Am:{$avg:'$saturdayAt10Am'},
        totalSaturdayAt11Am:{$avg:'$saturdayAt11Am'},
        totalSaturdayAt12Pm:{$avg:'$saturdayAt12Pm'},
        totalSaturdayAt1Pm:{$avg:'$saturdayAt1Pm'},
        totalSaturdayAt2Pm:{$avg:'$saturdayAt2Pm'},
        totalSaturdayAt3Pm:{$avg:'$saturdayAt3Pm'},
        totalSaturdayAt4Pm:{$avg:'$saturdayAt4Pm'},
        totalSaturdayAt5Pm:{$avg:'$saturdayAt5Pm'},
        totalSaturdayAt6Pm:{$avg:'$saturdayAt6Pm'},
        totalSaturdayAt7Pm:{$avg:'$saturdayAt7Pm'},
        totalSaturdayAt8Pm:{$avg:'$saturdayAt8Pm'},
        totalSaturdayAt9Pm:{$avg:'$saturdayAt9Pm'},
        totalSaturdayAt10Pm:{$avg:'$saturdayAt10Pm'},
        totalSaturdayAt11Pm:{$avg:'$saturdayAt11Pm'},
        totalMondayAt1Am:{$avg:'$mondayAt1Am'},
        totalMondayAt2Am:{$avg:'$mondayAt2Am'},
        totalMondayAt3Am:{$avg:'$mondayAt3Am'},
        totalMondayAt4Am:{$avg:'$mondayAt4Am'},
        totalMondayAt5Am:{$avg:'$mondayAt5Am'},
        totalMondayAt6Am:{$avg:'$mondayAt6Am'},
        totalMondayAt7Am:{$avg:'$mondayAt7Am'},
        totalMondayAt8Am:{$avg:'$mondayAt8Am'},
        totalMondayAt9Am:{$avg:'$mondayAt9Am'},
        totalMondayAt10Am:{$avg:'$mondayAt10Am'},
        totalMondayAt11Am:{$avg:'$mondayAt11Am'},
        totalMondayAt12Pm:{$avg:'$mondayAt12Pm'},
        totalMondayAt1Pm:{$avg:'$mondayAt1Pm'},
        totalMondayAt2Pm:{$avg:'$mondayAt2Pm'},
        totalMondayAt3Pm:{$avg:'$mondayAt3Pm'},
        totalMondayAt4Pm:{$avg:'$mondayAt4Pm'},
        totalMondayAt5Pm:{$avg:'$mondayAt5Pm'},
        totalMondayAt6Pm:{$avg:'$mondayAt6Pm'},
        totalMondayAt7Pm:{$avg:'$mondayAt7Pm'},
        totalMondayAt8Pm:{$avg:'$mondayAt8Pm'},
        totalMondayAt9Pm:{$avg:'$mondayAt9Pm'},
        totalMondayAt10Pm:{$avg:'$mondayAt10Pm'},
        totalMondayAt11Pm:{$avg:'$mondayAt11Pm'},
        totalSundayAt1Am:{$avg:'$sundayAt1Am'},
        totalSundayAt2Am:{$avg:'$sundayAt2Am'},
        totalSundayAt3Am:{$avg:'$sundayAt3Am'},
        totalSundayAt4Am:{$avg:'$sundayAt4Am'},
        totalSundayAt5Am:{$avg:'$sundayAt5Am'},
        totalSundayAt6Am:{$avg:'$sundayAt6Am'},
        totalSundayAt7Am:{$avg:'$sundayAt7Am'},
        totalSundayAt8Am:{$avg:'$sundayAt8Am'},
        totalSundayAt9Am:{$avg:'$sundayAt9Am'},
        totalSundayAt10Am:{$avg:'$sundayAt10Am'},
        totalSundayAt11Am:{$avg:'$sundayAt11Am'},
        totalSundayAt12Pm:{$avg:'$sundayAt12Pm'},
        totalSundayAt1Pm:{$avg:'$sundayAt1Pm'},
        totalSundayAt2Pm:{$avg:'$sundayAt2Pm'},
        totalSundayAt3Pm:{$avg:'$sundayAt3Pm'},
        totalSundayAt4Pm:{$avg:'$sundayAt4Pm'},
        totalSundayAt5Pm:{$avg:'$sundayAt5Pm'},
        totalSundayAt6Pm:{$avg:'$sundayAt6Pm'},
        totalSundayAt7Pm:{$avg:'$sundayAt7Pm'},
        totalSundayAt8Pm:{$avg:'$sundayAt8Pm'},
        totalSundayAt9Pm:{$avg:'$sundayAt9Pm'},
        totalSundayAt10Pm:{$avg:'$sundayAt10Pm'},
        totalSundayAt11Pm:{$avg:'$sundayAt11Pm'}

        ,count:{$sum:1}}}],function(err,result){


        console.log(result);
        res.send(result);

    })


//});

}

function getResData(req, res)
{


    var data = mongo.connectToCollection("predictData1");
    data.find({"type":req.body.type,"city":req.body.city}).toArray(function(err,result){

        if(err)
            throw err;
        res.send(result);
    })


}
exports.getResData=getResData;
exports.insertData=insertData;
exports.predictRes=predictRes;

