var http = require('http');
var _ = require("underscore");

function Redirecter(){
};

Redirecter.prototype.configure = function(config) {
  redirecter = this;
  
  redirecter.config = _.extend({
    port:3330,
    proxy: {
      host: "localhost",
      port: 80
    }
  }, config);
  
  redirecter.middlewares = [];
  for (var i = 1; i < arguments.length; i++)
    redirecter.middlewares.push(arguments[i]);
};

Redirecter.prototype.create_server = function() {
  redirecter = this;
   
  redirecter.server = http.createServer(function(request, response){
    var options = {
      headers:request.headers,
      hostname: redirecter.config.proxy.host,  
      port: redirecter.config.proxy.port,
      method: "get",
      path:request.url
    };
    
    if (redirecter.apply_middlewares(request, response)) {
      
    var req = http.request(options, function(res) {
      response.writeHead(res.statusCode, res.headers);

      res.on('data', function (chunk) {
        response.write(chunk);
      });

      res.on('end', function() {
        response.end();
      });
    });
    
    req.end();
    }
  });
};

Redirecter.prototype.apply_middlewares = function(request, response){
  redirecter = this;
  
  for (var i = 0; i < redirecter.middlewares.length; i++){
    if (! redirecter.middlewares[i].call(redirecter, request, response))
      return false;
  }
  return true;
};

Redirecter.prototype.listen = function() {
  this.server.listen(this.config.port);
};

module.exports = function(){
  redirecter = new Redirecter();
  redirecter.configure.apply(redirecter, arguments);
  redirecter.create_server();
  return redirecter;
};

module.exports.fn = Redirecter.prototype;