import axios from 'axios'
import check from 'check-types'

export default class Connext {
  constructor (apiKey, apiSecret, apiUrlOverride) {
    check.assert.string(
      apiKey,
      'API key required. Find yours here: https://app.connextapi.com.'
    )
    check.assert.string(
      apiSecret,
      'API secret required. Find yours here: https://app.connextapi.com.'
    )
    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.apiUrl = apiUrlOverride || 'https://api.connextapi.com/'
    this.authorizedRequest = axios.create({
      auth: { username: this.apiKey, password: this.apiSecret }
    })
  }

  getKey (email, password) {
    return new Promise((resolve, reject) => {
      check.assert.string(email, 'No email provided')
      check.assert.string(password, 'No password provided')

      axios
        .post(`${this.apiUrl}/key`, {
          key: email,
          secret: password
        })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  newToken () {
    return new Promise(resolve => {
      const token = {
        cardnumber: '',
        provider: 'VISA',
        currency: 'usd',
        firstname: '',
        lastname: '',
        month: '',
        year: '',
        cvv: '',
        addr1: '',
        addr2: '',
        zip: '',
        country: ''
      }
      resolve(token)
    })
  }

  tokenize (token) {
    check.assert.object(token, 'Invalid token information')

    return new Promise((resolve, reject) => {
      this.authorizedRequest
        .post(`${this.apiUrl}/tokenize`, { token })
        .then(({ data }) => {
          resolve(data.token)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  chargeCard (token, amount, chargebackDestination, tokenContractAddress) {
    check.assert.object(token, 'Check card information')
    check.assert.string(token.cvv, 'Check card information')
    check.assert.positive(amount, 'Provide valid amount')
    check.assert.string(
      chargebackDestination,
      'Provide valid ethereum address for chargeback destination'
    )
    check.assert.string(
      tokenContractAddress,
      'Provide valid ethereum address for token contract address'
    )

    return new Promise((resolve, reject) => {
      this.authorizedRequest
        .post(`${this.apiUrl}/charge`, {
          token,
          amount,
          chargebackDestination,
          tokenContractAddress
        })
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  getBalance (vaultAddress) {
    check.assert.string(
      vaultAddress,
      'Provide valid ethereum address for vault address'
    )

    return new Promise((resolve, reject) => {
      this.authorizedRequest
        .get(`${this.apiUrl}/vault/${vaultAddress}/balance`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
