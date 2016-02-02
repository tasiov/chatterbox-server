/* Import node's http module: */
// var http = require("http");
var express = require("../node_modules/express");
var app = express();
var Handler = require('./request-handler');
var handleRequest = Handler.requestHandler;
var url = require('url');
var ChatServer = handleRequest();

var port = 3000;

var ip = "127.0.0.1";

// var server = http.createServer(handleRequest);
app.listen(port, function() {
  console.log("Listening on http://" + ip + ":" + port);

});

// var path = url.parse(request.url).pathname;
// var acceptedURLs = ['/classes/room', '/', '/log','/classes/room1', '/classes/messages', '/classes/chatterbox'];
// console.log('path test', acceptedURLs.indexOf(path) !== -1);
app.route('/*')
  .get(function(req, res) {
    console.log('get');
    ChatServer.getHandler(req, res);
  })
  .post(function(req, res) {
    console.log('post');
    ChatServer.postHandler(req, res);
  })
  .options(function(req, res) {
    console.log('opt');
    ChatServer.optionsHandler(req, res);
  });
// if (acceptedURLs.indexOf(path) === -1 ) {
//     response.writeHead(404, headers);
//     response.end('Not found on server');
// }