const request = require('request-promise')

request.get('http://127.0.0.1:8000')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
