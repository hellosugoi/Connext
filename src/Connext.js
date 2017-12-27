import axios from 'axios'
import check from 'check-types'

export default class Connext {
  constructor (apiKey, apiSecret, apiUrlOverride) {
    check.assert.string(
      apiKey,
      'API key required. Find yours here: https://app.connext.network.'
    )
    check.assert.string(
      apiSecret,
      'API secret required. Find yours here: https://app.connext.network.'
    )
    this.apiKey = apiKey
    this.apiSecret = apiSecret
    this.apiUrl = apiUrlOverride || 'http://api.connext.network/'
    this.authorizedRequest = axios.create({
      auth: { username: this.apiKey, password: this.apiSecret }
    })
  }

  async getCustomer (email) {
    check.assert.string(email, 'No email provided')
    const response = await axios.post(
      `${this.apiUrl}/customer/find?email=${email}`
    )
    return response.data
  }

  async createCustomer (email) {
    check.assert.string(email, 'No email provided')
    const response = await axios.post(`${this.apiUrl}/customer/${email}`)
    return response.data
  }

  async getKey (email, password) {
    check.assert.string(email, 'No email provided')
    check.assert.string(password, 'No password provided')
    const response = await axios.post(`${this.apiUrl}/key`, {
      key: email,
      secret: password
    })
    return response.data
  }

  async newToken () {
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
    return token
  }

  async tokenize (token) {
    check.assert.object(token, 'Invalid token information')
    const response = await this.authorizedRequest.post(
      `${this.apiUrl}/tokenize`,
      { token }
    )
    return response.data
  }

  async chargeCard (token, amount, emailAddress) {
    check.assert.object(token, 'Check card information')
    check.assert.string(token.cvv, 'Check card information')
    check.assert.positive(amount, 'Provide valid amount')
    check.assert.string(
      emailAddress,
      'Provide valid email address for customer'
    )

    const response = await this.authorizedRequest.post(
      `${this.apiUrl}/charge`,
      {
        token,
        amount,
        emailAddress
      }
    )
    return response.data
  }

  async getEthBalance (vaultAddress) {
    check.assert.string(
      vaultAddress,
      'Provide valid ethereum address for vault address'
    )

    const response = await this.authorizedRequest.get(
      `${this.apiUrl}/vault/${vaultAddress}/balance`
    )
    return response.data
  }

  async getTokenBalance (vaultAddress, tokenContractAddress) {
    check.assert.string(
      vaultAddress,
      'Provide valid ethereum address for vault address'
    )

    check.assert.string(
      tokenContractAddress,
      'Provide valid ethereum address for token contract'
    )

    const response = await this.authorizedRequest.get(
      `${this.apiUrl}/vault/${vaultAddress}/balance/${tokenContractAddress}`
    )
    return response.data
  }
}
