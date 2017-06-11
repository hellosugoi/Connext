var tokenize = require('./tokenize');
var chargeCard = require('./chargeCard');
var chargeEth = require('./chargeEth');
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
		// chargeEth: function(to, from, from_key, amount, callback) {
		// 	chargeEth(key, secret, to, from, from_key, amount, callback);
		// },
		newToken: function(callback){
			newToken(callback);
		}
	}
}