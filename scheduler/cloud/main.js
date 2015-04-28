var async = require("cloud/node_modules/async/lib/async.js");
var darksky = require("cloud/node_modules/darksky/index.js");
var keys = require("cloud/keys.js");
var moment = require("moment");

Parse.Cloud.job("scheduleNotification", function(request, response){
  var query = new Parse.Query(Parse.User);

  query.each(function(user){

    var from = {};
    from.lat = user.get("home_lat");
    from.lon = user.get("home_lon");

    var to = {};
    to.lat = user.get("home_lat");
    to.lon = user.get("home_lon");

    var arrival_time = user.get("arrival_time");

    var push_time = "123456789"; // compute this

    async.waterfall([

      function(callback) {
        darksky.forecast(form.lat, from.lon, function(err, weather){
          if(err) callback(err);
          callback(null, weather);
        });
      },

      function(weather, callback) {
        darksky.forecast(from.lat, from.lon, function(err, traffic){
          if(err) callback(err);
          callback(null, weather, traffic);
        });
      }], function(err, weather, traffic){

        //compute notification based on weather and traffic
        var notification = {};
        notification.text = "Hello World";
        notification.push_time = "123456789";

        //schedule push notification for this user here.

    });
  });//end loop

});



Parse.Cloud.define("hello", function(request, response) {
  console.log(darksky);
  response.success("Hello world!");
});
