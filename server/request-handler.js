/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var filename = '~/server/messageStore.json';
var requestHandler = function(request, response) {
  var fs = require('fs');
  var url = require('url');
  var statusCode = 200;
  var ChatServer = {
    getHandler: function (request, response) {
      response.set(headers);
      response.status(statusCode);
      fs.readFile(filename,function (err, data) {
        if(err) {
          console.log('Could not read file!!');
          throw err;
        }
        // console.log(data.toString());
        //var reverseData = JSON.parse(data.toString()).results.reverse;
        response.send(JSON.parse(data.toString()));
      });
    },

    postHandler: function (request, response) {
      response.set(headers);
      response.status(201);
      var buildRequest = "";
      request.on('data', function (data) {
          buildRequest = data.toString();
      });
      request.on('end', function (data) {
          var postData = JSON.parse(buildRequest);
          var username = postData.username;
          var chatText = postData.text;
          var createdAt = Date.now();

          var id = Math.floor(Math.random() * 1000000);

          fs.readFile(filename,function (err, data) {
            if(err) throw err;
            var fileStore = JSON.parse(data.toString());
            var result = {username: username, text: chatText, objectId: id, createdAt: createdAt};
            fileStore.results.unshift(result);

            fs.writeFile(filename, JSON.stringify(fileStore), function (err) {
              if (err) console.log('Could not write fileStore');
              else console.log('File fileStore written');
            });
          });

          response.send(JSON.stringify({objectId:id}));        
        });
    },

    optionsHandler: function (request, response) {
      headers['Content-Type'] = 'text/plain';
      response.set(headers);
      response.status(statusCode);

      response.send(JSON.stringify({}));
    }
  };

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key",
  "access-control-max-age": 10 // Seconds.
};

  // console.log("Serving request type " + request.method + " for url " + request.url);

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/json";
  // var path = url.parse(request.url).pathname;
  // var acceptedURLs = ['/classes/room', '/', '/log','/classes/room1', '/classes/messages', '/classes/chatterbox'];
  // console.log('path test', acceptedURLs.indexOf(path) !== -1);
  // if (acceptedURLs.indexOf(path) === -1 ) {
  //   response.writeHead(404, headers);
  //   response.end('Not found on server');
  // } else if (request.method === 'GET'){
  //   ChatServer.getHandler();
  // } else if (request.method === 'POST'){
  //   ChatServer.postHandler();
  // } else if (request.method ==='OPTIONS'){
  //   ChatServer.optionsHandler();
  // }
  return ChatServer;
};
exports.requestHandler = requestHandler;


