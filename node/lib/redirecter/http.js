var http = require('http');
var _ = require("underscore");

/**
 * Wraps value in array
 *
 * @example
 *   as_array() # returns []
 *
 * @example
 *   as_array(1) # returns [1]
 *
 * @example
 *   as_array([1]) # returns [1]
 */
function as_array(value){
  if (value === undefined || value === null)
    return [];
  if (value.constructor == Array)
    return value;
  return [value];
}

/**
 * Class responsible for tunnelling requests
 */
function Redirecter(config){
  this.configure.call(this, config);
};

/**
 * Configure redirecter
 */
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

/**
 * Initiate server
 */
Redirecter.prototype.createServer = function() {
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
        for (k in res.headers) {
          response.setHeader(k, res.headers[k]);
        }
        res.pipe(response, {
          end: true
        });
      });

      request.pipe(req);
    }
  });
};

/**
 * Run before scripts on request
 */
Redirecter.prototype.apply_before = function(request, response){
  redirecter = this;

  for (var i = 0; i < redirecter.before.length; i++){
    if (! redirecter.before[i].call(redirecter, request, response))
      return false;
  }
  return true;
};

/**
 * Listen to port
 */
Redirecter.prototype.listen = function() {
  this.createServer();
  this.server.listen(this.config.port);
};

/**
 * Stops listening
 */
Redirecter.prototype.stop = function() {
  this.server.close();
}

module.exports = function(config){
  redirecter = new Redirecter(config);
  return redirecter;
};

module.exports.fn = Redirecter.prototype;
