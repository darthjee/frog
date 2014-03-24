var http = require('http');
var _ = require("underscore");

function redirecter(config){
  redirecter = this;
  redirecter.config = _.extend({
    port:3330,
    proxy: {
      host: "localhost",
      port: 80
    }
  }, config);
   
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

  redirecter.server.listen(redirecter.config.port);
};

module.exports = function(config){
  new redirecter(config);
};

module.exports.fn = redirecter.prototype;