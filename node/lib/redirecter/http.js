var http = require('http');
var _ = require("underscore");

/**
 * Wraps value in array
 *
 * @example
 *   asArray() # returns []
 *
 * @example
 *   asArray(1) # returns [1]
 *
 * @example
 *   asArray([1]) # returns [1]
 */
function asArray(value){
  if (value === undefined || value === null)
    return [];
  if (value.constructor == Array)
    return value;
  return [value];
}

/**
 * Class responsible for tunnelling requests
 */
class Redirecter {
  constructor(config) {
    _.bindAll(this, '_handleRequest');

    this._configure.call(this, config);
  }

  /**
   * Listen to port
   */
  listen() {
    this._createServer();
    this.server.listen(this.config.port);
  }

  /**
   * Stops listening
   */
 stop() {
    this.server.close();
  }

  /**
   * Configure redirecter
   */
  _configure(config) {
    let redirecter = this;

    redirecter.config = _.extend({
      port:3330,
      proxy: {
        host: "localhost",
        port: 80
      },
      before:[]
    }, config);

    redirecter.before = asArray(config.before);
  }

  /**
   * Initiate server
   */
  _createServer() {
    let redirecter = this;

    redirecter.server = http.createServer(this._handleRequest);
  }

  /**
   * Handles each request piping it to the proxied server
   */
  _handleRequest(request, response){
    var options = {
      headers:request.headers,
      hostname: this.config.proxy.host,
      port: this.config.proxy.port,
      method: request.method,
      path:request.url
    };

    if (this._applyBefore(request, response)) {
      var req = http.request(options, function (res) {
        response.writeHead(res.statusCode,res.headers);
        res.pipe(response, {
          end: true
        });
      });

      request.pipe(req);
    }
  }

  /**
   * Run before scripts on request
   */
  _applyBefore(request, response){
    let redirecter = this;

    for (var i = 0; i < redirecter.before.length; i++){
      if (! redirecter.before[i].call(redirecter, request, response))
        return false;
    }
    return true;
  }
}

module.exports = function(config){
  redirecter = new Redirecter(config);
  return redirecter;
};

module.exports.fn = Redirecter.prototype;
