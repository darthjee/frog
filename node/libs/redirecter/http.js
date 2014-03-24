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
  	response.writeHead(200, {"Content-Type":"text/html"});
  	
  	headers = _.extend(request.headers, {
  	  'accept-encoding': 'utf-8'
  	});
  	
  	var options = {
      headers:headers,
  	  hostname: redirecter.config.proxy.host,  
  	  port: redirecter.config.proxy.port,
  	  method: "get",
  	  path:"/"
  	};
    
    var req = http.request(options, function(res) {
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