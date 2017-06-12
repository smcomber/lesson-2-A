const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Express yourself!')
})

app.listen(3000, () => {
  console.log('Now listening on port 3000!')
})
