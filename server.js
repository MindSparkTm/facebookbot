var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 5000));

// Server index page
app.get("/", function (req, res) {
    res.send("Deployed!");
});

// Facebook Webhook
// Used for verification
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'this_is_my_token') {
        console.log("Valid Token");
        res.send(req.query['hub.challenge']);

    } else {
        res.send('Invalid verify token');
    }

});

var requestLoop = setInterval(function(){
  request({
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyC1--EkFGnVQbRsQi4aQ4OKYOW2Py2Ju0U",
      method: "POST",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
  },function(error, response, body){
      if(!error && response.statusCode == 200){
          console.log('sucess!');
      }else{
          console.log('error' + response.statusCode);
      }
  });
}, 2000);





