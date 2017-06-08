var request = require('request');

var getKey = function(email, password, callback) {


	var options = {
	  url: 'http://api.connextapi.com/getKey/',
	  json: true,
	  qs: {
	  	email: email,
	  	password: password
	  },
	  headers: {
	    'Authentication': password
	  }
	};

	request(options, function(error, response, body) {
	  if (!error && response.statusCode == 200) {
	   	callback(body);
	  } else console.log(error);
	});

}

module.exports = getKey;