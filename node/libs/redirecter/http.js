var http = require('http');
var _ = require("underscore");

function as_array(value){
  if (value === undefined || value === null)
    return [];
  if (value.constructor == Array)
    return value;
  return [value];
}

function Redirecter(config){
  this.configure.call(this, config);
  this.create_server();
};

Redirecter.prototype.configure = function(config) {
  redirecter = this;
  
  redirecter.config = _.extend({
    port:3330,
    proxy: {
      host: "localhost",
      port: 80
    },
    before:[]
  }, config);
  
  redirecter.before = as_array(config.before);
};

Redirecter.prototype.create_server = function() {
  redirecter = this;
   
  redirecter.server = http.createServer(function(request, response){
    var options = {
      //headers:request.headers,
      hostname: redirecter.config.proxy.host,  
      port: redirecter.config.proxy.port,
      method: request.method,
      path:request.url
    };
    
    if (redirecter.apply_before(request, response)) {
      var req = http.request(options, function (res) {
        res.pipe(response, {
          end: true
        });
      });
    
      request.pipe(req);
    }
  });
};

Redirecter.prototype.apply_before = function(request, response){
  redirecter = this;
  
  for (var i = 0; i < redirecter.before.length; i++){
    if (! redirecter.before[i].call(redirecter, request, response))
      return false;
  }
  return true;
};

Redirecter.prototype.listen = function() {
  this.server.listen(this.config.port);
};

module.exports = function(config){
  redirecter = new Redirecter(config);
  return redirecter;
};

module.exports.fn = Redirecter.prototype;