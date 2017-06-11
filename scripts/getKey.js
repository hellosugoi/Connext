var request = require('request');

var getKey = function(email, password, callback) {

	if(!email){
		console.log("Error: no email provided");
		return callback({error: "no email provided"}, null);
	}

	if(!password){
		console.log("Error: no password provided");
		return callback({error: "no password provided"}, null);
	}

	var options = {
	  url: 'http://api.connextapi.com/getKey/',
	  json: true,
	  headers: {
	    'Authorization': password:email
	  }
	};

	request(options, function(error, response, body) {
	  if (!error && response.statusCode == 200) {
	   	callback(error, body);
	  } else console.log(error, null);
	});

}

module.exports = getKey;