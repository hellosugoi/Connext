# Connext
npm module for Connext

## Installation

`npm install connext --save`

Best practices:

1) Call Connext functions only from your client-side code. To ensure that you remain PCI compliant, credit card data must not directly touch your servers

2) Construct your connext object in a separate connext.js file and export it. This will reduce the risk of key and secret information being leaked.

```
//connext.js
var Connext = require('connext');
var connext = new Connext(ApiKey, ApiSecret);

module.exports = connext;
```

## Reference

### getKey() [to be deprecated soon for security reasons]

Inputs: (email, password, [callback])
Outputs: (error, {key, secret})

Retrieves your key and secret if you already have an account. Outputs get returned into a callback.

Usage:

```
connext.getKey(email, password, function(auth_details) {
   var key = auth_details.key;
   var secret = auth_details.secret;
}) 
```

### newToken()

Inputs: ([callback])
Outputs: (error, token)

Generates an empty token object to be filled out into a callback. You can ```console.log()``` it to find out what the possible data fields are. You should call this on your client side and fill out the data fields there so that no credit card info touches your servers.

### tokenize()

Inputs: (token, [callback])
Outputs: (error, updated_token)

Sends the card info to connext servers and returns a token in a callback. The token is a redacted version of the information which is saveable on your servers without violating PCI compliancy. Like above, call only from the client side to make sure credit card info never touches your servers.

### chargeCard()

Inputs: (token, amount, [callback])
Outputs: (error, receipt)

Actually charges the card. *Amount must be written as payment(in dollars)x100*. Eg: $30.10 becomes 3010. The tokenization and charge process are separated to facilitate recurring payments or a second attempt at a payment if the payment fails. Returns a receipt object in the callback. For now, the receipt object only has a success field.

### chargeEth() [COMING SOON]

Inputs: (key, secret, to, from, from_key, amount, [callback])
Outputs: 1st callback(error, transaction hash), 2nd callback(error, transaction receipt)

Not deployed yet. This will eventually be an easy to integrate "Pay with Eth" button that works with metamask out of the box! 

## Example usage:

```
//connext.js
var Connext = require('connext');
var connext = new Connext(ApiKey, ApiSecret);

module.exports = connext;

//index.js
var connext = require('./path/to/connext.js');

connext.newToken(function(err, token){
	if (err) return (err);
	
	//add payment info here from input fields
	//...
	
	//tokenize the card data
	connext.tokenize(token, function(err, updated_token) {
		if (err) return (err);
		
		//actually charge the card
		connext.chargeCard(updated_token, 101, function(err, receipt) {
			if (err) return (err);
			
			console.log(receipt); //logs "success"
		})
	})
})
```
