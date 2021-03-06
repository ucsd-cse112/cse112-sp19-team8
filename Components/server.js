const express = require('express')
const app = express()
var path = require('path')

// Allow node app to see js files.
app.use(express.static(path.join(__dirname, '/public')))

// Set main route to index.html
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

// Set main route to index.html
app.get('/demo', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/teamsiteDemo.html'))
})

// Create a local port.
const server = app.listen(8080, () => {
  console.log('Running at Port 8080. Go to localhost:8080')
})

module.exports = server
