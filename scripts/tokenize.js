var request = require('request');

var tokenize = function(key, secret, token, callback) {

	if(!token){
		console.log("Error: no token provided");
		return callback({error: "no token provided"}, null)
	}

	var options = {
	  url: 'http://api.connextapi.com/tokenize/',
	  method: 'POST',
	  json: true,
	  body: {
	  	"token": token,
	  },
	  headers: {
	    'Authentication': key:secret
	  }
	};

	request(options, function(error, response, body) {
		if(!error && response.statusCode == 200) {
			callback(error, body);
		} else console.log(error, null);
	})
}

module.exports = tokenize;