var Http = require('http'),
  _ = require('../underscore_ext'),
  Request = require('./request');

/**
 * Class responsible for proxying requests
 *
 * Server will listen to an specific port (given in configuration)
 * then pipe any received request to it's proxy configurated server
 * piping then the response back
 *
 * @param config {Object} Configuration of server
 * @param config.port {Integer} Port where the server will listen for requests
 * @param config.proxy {Object} Proxy ({@link Request}) configuration
 * @param config.before {Function} Function to be used as filter of request
 *   When a filter returns false, the request is not proxied (and the function will
 *   then handle the response).
 *
 *   before can also be an Array of functions
 *
 * @see Request
 *
 * @example
 *   filterFunction(request, response) {
 *     if (request.url == '/mocked') {
 *       response.write('mocked response');
 *       response.end();
 *       return false;
 *     } else {
 *       return true;
 *     }
 *   }
 *
 *   new Server({
 *     port: 3500,
 *     proxy: {
 *       host: 'google.com',
 *       port: 80
 *     },
 *     before: [
 *       filterFunction
 *     ]
 *   }).listen();
 */
class Server {
  constructor(config) {
    _.bindAll(this, '_handleRequest');

    this._configure.call(this, config);
  }

  /**
   * Starts listening on configurated port
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
   * @private
   */
  _configure(config) {
    this.config = _.extend({
      port:3330,
      before:[]
    }, config);

    this.before = _.asArray(config.before);
  }

  /**
   * @private
   */
  _createServer() {
    let redirecter = this;

    redirecter.server = Http.createServer(this._handleRequest);
  }

  /**
   * @private
   */
  _handleRequest(request, response){
    if (this._applyBefore(request, response)) {
      this._pipeRequest(request, response);
    }
  }

  /**
   * @private
   */
  _pipeRequest(request, response) {
    request.pipe(this._proxyRequest(request, response));
  }

  /**
   * @private
   */
  _proxyRequest(request, response) {
    return Request(this.config.proxy, request, response).startRequest();
  }

  /**
   * @private
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
  return new Server(config);
};

module.exports.fn = Server.prototype;
