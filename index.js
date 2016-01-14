var http = require('http')
var sendJSON = require('send-data/json')
var sendError = require('send-data/error')
var Logger = require('log')
var log = new Logger('info')

var random = require("random-js")() // uses the nativeMath engine


var server = http.createServer((req, res) => {
  var value = random.integer(1, 6)
  if (value === 2) {
    // never respond back, client should timeout
    return
  }
  if (value === 1) {
    return sendError(req, res, {
      logger: log,
      body: {
        message: 'Gateway Not Available',
        statusCode: 503
      },
      bodyStatusCode: true
    })
  }
  setTimeout(() => sendJSON(req, res, { status: 'empty' }), 10000)
})
var port = process.env.PORT || 3000
server.listen(port)
console.log('server listening on port 3000')
