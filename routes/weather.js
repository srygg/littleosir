var express = require('express');
var router = express.Router();
var apiai = require('apiai');
var app = apiai("1439d8d1ff654084af8265fcfa6de923");
var YQL = require('yql');

/* post to weather. */
router.post('/', function(req, res, next) {

	// console.log(req.body.result['resolvedQuery'])
	
	var queryParameters = req.body.result.parameters;
	var { resolvedQuery } = req.body.result;
	// console.log(queryParameters)
	var sessionId = req.body.sessionId;

	var result = {
		speech: "",
		displayText: "",
		data: {},
		contextOut: [],
		source: ""
	};

	result = {
    "speech": "In London, it will be 12 C, Cloudy, Tue, 31 Oct 2017 05:00 PM GMT",
    "displayText": "In London, it will be 12 C, Cloudy, Tue, 31 Oct 2017 05:00 PM GMT",
    "data": {},
    "contextOut": [
        {
            "name": "weather",
            "lifespan": 100,
            "parameters": {
                "geo-city": "London",
                "date": "Tue, 31 Oct 2017 05:00 PM GMT"
            }
        }
    ],
    "source": ""
}

  var dialogFlowRequest = app.textRequest(resolvedQuery, { sessionId });

	dialogFlowRequest.on('response', function(response) {
    // console.log('response: ', response);

		// var queryGeo = new YQL(`select * from geo.places where text="${queryParameters['geo-city']}"`);
		// queryGeo.exec(function (error, geolocation) {
		// 	// Do something with results (response.query.results)
		// 	// console.log(geolocation.query.results.place[0].woeid);
		// 	var woeid = geolocation.query.results.place[0].woeid;
		// 	var queryWeather = new YQL(`select item.condition from weather.forecast where woeid=${woeid} and u='c'`);
		// 	queryWeather.exec(function (error, weathers) {
		// 		if(error) {
		// 			res.status(500).send('error: ' + error);
		// 		}
		// 		// console.log(weathers.query.results.channel.item.condition);
		// 		var { date, temp, text } = weathers.query.results.channel.item.condition;
		// 		result.speech = `In ${queryParameters['geo-city']}, it will be ${temp}, ${text}, ${date}`;
		// 		result.displayText = `In ${queryParameters['geo-city']}, it will be ${temp}, ${text}, ${date}`;
		// 		result.contextOut = [{"name":"weather", "lifespan":2, "parameters":{"geo-city":queryParameters['geo-city'], "date": date}}]

		// 		console.log(result)

		//     res.set({'Content-type': 'application/json'});
		// 	  res.jsonp(result);
		// 	});
		// });
		res.jsonp(result);
	});

	dialogFlowRequest.on('error', function(error) {
	    console.log('error: ', error);
	    res.status(500).send('error: ' + error);
	});

	dialogFlowRequest.end();

});

module.exports = router;
