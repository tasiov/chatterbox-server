/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messageStore = {
  results: []
};
  
// var storage = require('./basic-server');
var requestHandler = function(request, response) {
  var url = require('url');
  var self = messageStore;
  var statusCode = 200;
  var ChatServer = {
    getHandler: function () {
      // console.log('messageStore', messageStore);
      response.writeHead(statusCode, headers);
      console.log(self, 'storage');
      response.end(JSON.stringify(self));
    },

    postHandler: function () {
      response.writeHead(201, headers);
      var buildRequest = "";
      request.on('data', function (data) {
          buildRequest = data.toString();
      });
      request.on('end', function (data) {
          var postData = JSON.parse(buildRequest);
          var username = postData.username;
          var message = postData.message;
          console.log(postData, 'message recived');
          var id = Math.floor(Math.random() * 1000000);
          self.results.push({username: username, message: message, objectId: id});
          response.end(JSON.stringify({objectId:id}));        
      });
    },

    optionsHandler: function () {
      headers['Content-Type'] = 'text/plain';
      response.writeHead(statusCode, headers);

      response.end(JSON.stringify({}));
    }
  };

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key",
  "access-control-max-age": 10 // Seconds.
};

  console.log("Serving request type " + request.method + " for url " + request.url);

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/json";
  var path = url.parse(request.url).pathname;
  var acceptedURLs = ['/classes/room', '/', '/log','/classes/room1', '/classes/messages'];
  console.log('path test', acceptedURLs.indexOf(path) !== -1);
  if (acceptedURLs.indexOf(path) === -1 ) {
    response.writeHead(404, headers);
    response.end('Not found on server');
  } else if (request.method === 'GET'){
    ChatServer.getHandler();
  } else if (request.method === 'POST'){
    ChatServer.postHandler();
  } else if (request.method ==='OPTIONS'){
    // console.log('options: ', request);
    ChatServer.optionsHandler();
  }
};
exports.requestHandler = requestHandler;


