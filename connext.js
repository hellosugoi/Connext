var tokenize = require('./scripts/tokenize');
var chargeCard = require('./scripts/chargeCard');
var chargeEth = require('./scripts/chargeEth');
var newToken = require('./scripts/newToken');
var getKey = require('./scripts/getKey');

module.exports = function(key, secret) {
	return {
		getKey: function(email, password, callback) {
			getKey(email, password, callback);
		},
		tokenize: function(token, callback) {
			tokenize(key, secret, token, callback);
		},
		chargeCard: function(token, amount, callback) {
			chargeCard(key, secret, token, amount, callback);
		},
		newToken: function(callback){
			newToken(callback);
		}
	}
}