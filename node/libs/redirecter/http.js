var http = require('http');
var _ = require("underscore");

function Redirecter(config){
  this.configure.apply(this, arguments);
  this.create_server();
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
  for (var i = 1; i < arguments.lenght; i++)
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
  });
};

Redirecter.prototype.listen = function() {
  this.server.listen(this.config.port);
};

module.exports = function(config){
  return new Redirecter(config);
};

module.exports.fn = Redirecter.prototype;