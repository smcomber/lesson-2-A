const Promise = require('bluebird')
const request = require('request')
const requestPromisified = Promise.promisify(request)
const port = process.env.PORT || 3000

module.exports = {
  request (method, url, body = {}, headers = {}) {
    return requestPromisified({
      url: `http://localhost:${port}${url}`,
      json: true,
      headers,
      method,
      body
    })
  }
}
