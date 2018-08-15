var Http = require('http'),
  _ = require('../underscore_ext');
  Request = require('./request');

/**
 * Class responsible for tunnelling requests
 */
class Server {
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
        host: 'localhost',
        port: 80
      },
      before:[]
    }, config);

    redirecter.before = _.asArray(config.before);
  }

  /**
   * Initiate server
   */
  _createServer() {
    let redirecter = this;

    redirecter.server = Http.createServer(this._handleRequest);
  }

  /**
   * Handles each request piping it to the proxied server
   */
  _handleRequest(request, response){
    if (this._applyBefore(request, response)) {
      this._pipeRequest(request, response);
    }
  }

  _pipeRequest(request, response) {
    request.pipe(this._proxyRequest(request, response));
  }

  _proxyRequest(request, response) {
    return Request(this.config, request, response).startRequest();
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
  return new Server(config);
};

module.exports.fn = Server.prototype;
