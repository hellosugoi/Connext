# Connext
npm module for Connext

## Installation

`npm install connext --save`

Best practices:

1) Call Connext functions only from your client-side code. To ensure that you remain PCI compliant, credit card data must not directly touch your servers

2) Do not save your API key and secret into source control. Use other strategies such as a git-ignored config file or environment variables.

```
//connext.js
const Connext = require('connext');

const apiKey = process.env.API_KEY
const apiSecret = process.env.API_SECRET

const connext = new Connext(apiKey, apiSecret);

module.exports = connext;
```

## Reference

All of the Connext object methods return Promises. See this article for an overview on how to use them: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises. If you are using ES2017 syntax, you can use async/await for a much cleaner syntax.

### getKey(email, password) [to be deprecated soon for security reasons]

Inputs: (email, password)

Outputs: Promise that resolves with object `{ key, secret }`

Retrieves your key and secret if you already have an account.

Usage:

```
const { key, secret } = await connext.getKey("rahul@connext.network", "s3cur3$$PW")
console.log(key, secret);
```

### getCustomer(email)

Inputs: (email)

Outputs: Promise that resolves with object `{ vaultAddress, id }`

Retrieves a vault address and user ID for an email address, if it exists.

Usage:

```
const { vaultAddress, id } = await connext.getCustomer("rahul@connext.network")
console.log(vaultAddress, id);
```

### createCustomer(email)

Inputs: (email)

Outputs: Promise that resolves with object `{ vaultAddress, id }`

Creates a customer by an email address.

Usage:

```
const { vaultAddress, id } = await connext.createCustomer("rahul@connext.network")
console.log(vaultAddress, id);
```

### newToken()

Inputs: ()

Outputs: Promise that resolves with an object `{ ...tokenParameters }`

Generates an empty token object to be filled out into a Promise. You can `console.log()` it to find out what the possible data fields are. You should call this on your client side and fill out the data fields there so that no credit card info touches your servers.

Usage:

```
const token = await connext.newToken()
console.log(token) // show token parameters
```

### tokenize(token)

Inputs: (token)

Outputs: Promise that resolves with an object `{ ...updatedTokenParameters }`

Sends the card info to connext servers and returns a token in a callback. The token is a redacted version of the information which is saveable on your servers without violating PCI compliancy. Like above, call only from the client side to make sure credit card info never touches your servers.

Usage:

```
const newToken = await connext.tokenize(token)
console.log(newToken)
```

### chargeCard(token, amount, chargebackDestination, tokenContractAddress)

Inputs: (token, amount, customerEmail)

Outputs: Promise that resolves with an object `{ vaultAddress, transactionId, amount }`

Actually charges the card and gives the address of the user's vault, where the tokens will be sent. *Amount must be written as payment(in dollars)x100, as a number*. Eg: $30.10 becomes 3010. The tokenization and charge process are separated to facilitate recurring payments or a second attempt at a payment if the payment fails. The resolved Promise object contains the vault address, the transaction ID, and the amount.

## Example usage:

```
try {
  const blankToken = await connext.newToken()

  // add payment info here from input fields
  // ...
  const token = await connext.tokenize(token)

  // destructure vault address from response
  const { vaultAddress } = await connext.chargeCard(token, 101, "rahul@connext.network")
  // send tokens to vault
} catch (error) {
  // handle the error
}

## Error Handling

The Connext API makes use of [axios](https://github.com/mzabriskie/axios) for HTTP calls. Errors are returned directly from axios, so they should be handled appropriately using this guide as reference: https://github.com/mzabriskie/axios#handling-errors
