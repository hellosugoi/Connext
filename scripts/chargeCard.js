var request = require("request");

var chargeCard = function(key, secret, token, amount, callback) {
  if (!token || token.cvv == null) {
    console.log("Error: check card information");
    return callback({ error: "check card information" }, null);
  }

  if (!amount) {
    console.log("Error: no amount entered");
    return callback({ error: "no amount entered" }, null);
  }

  var options = {
    url: "http://api.connextapi.com/charge/",
    method: "POST",
    json: true,
    body: {
      token: token,
      amount: amount,
      key: key,
      secret: secret
    }
  };

  request(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      callback(error, body);
    } else callback(error, null);
  });
};

module.exports = chargeCard;
