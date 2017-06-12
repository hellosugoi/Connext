var request = require('request');

var validateKey = function(key, secret, callback) {

	var options = {
		url: 'http://api.connextapi.com:3000/validateKey/',
		method: 'POST',
		json: true,
		body: {
	  	}
	};

	request(options, function (error, response, body) {
		callback(error, body);
	})

}

module.exports = validateKey;