/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// var storage = require('./basic-server');

var requestHandler = function(request, response) {
  var self = this;
  var ChatServer = {
    getHandler: function () {
      // var responseBuild = {};
      // responseBuild.results = [{}];
      // responseBuild.timeNow = Date.now();
      // console.log('messageStore', messageStore);
      response.writeHead(statusCode, headers);
      console.log(self);
      response.end(JSON.stringify(self));
    },

    postHandler: function () {
      response.writeHead(201, headers);
      console.log(request);
      var buildRequest = "";
      request.on('data', function (data) {
          buildRequest = data.toString();
      });
      request.on('end', function (data) {
          var postData = JSON.parse(buildRequest);
          var username = postData.username;
          var message = postData.text;
          var id = Math.floor(Math.random() * 1000000);
          self.results.push({username: username, text: message, objectId: id});
          response.end(JSON.stringify({objectId:id}));        
      });
      console.log(buildRequest);
    },

    optionsHandler: function () {
      headers['Content-Type'] = 'text/plain';
      console.log(request, "At options..............................................");
      console.log('status": ', statusCode, 'headers:  ', headers);
      response.writeHead(statusCode, headers);

      response.end(JSON.stringify({}));
    }
  };
  // Request and Response come from node's http module.
  //jhy
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key",
  "access-control-max-age": 10 // Seconds.
};
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.


  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "text/json";

  if (request.method === 'GET'){
    ChatServer.getHandler();
  } else if (request.method === 'POST'){
    ChatServer.postHandler();
  } else if (request.method ==='OPTIONS'){
    // console.log('options: ', request);
    ChatServer.optionsHandler();
  }
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end("Hello, World!");



};


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

exports.requestHandler = requestHandler;