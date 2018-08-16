var http = require('http'),
  _ = require('../underscore_ext');

/**
 * Class responsible for creating a request to the proxied server
 * and then piping the received request foward
 *
 * @param config {Object} Configuration of the proxyied server
 * @param config.host {String} Hostname where the request is being directed to
 * @param config.port {Integer} Port where the host is receiving the request
 * @param request {Http.IncomingMessage} Original request received
 * @param response {Http.OutgoingMessage} Original response object where response wil be piped to
 *
 * @example
 *   var http = require('http');
 *
 *   http.createServer(function(original_request, original_response) {
 *     var request = new Request({
 *       host: 'google.com', port: 80
 *     }, original_request, original_response);
 *
 *     original_request.pipe(request.startRequest());
 *   })
 */
class Request {
  constructor(config, request, response) {
    _.bindAll(this, '_handleResponset');

    this._configure(config);
    this.request = request;
    this.response = response;
  }

  /**
   * Initiate request to proxied server
   *
   * the response Handles pipes the response back to
   * the original response object given
   *
   * @returns Http.ClientRequest
   */
  startRequest() {
    var options = {
      headers:  this.request.headers,
      hostname: this.config.host,
      port:     this.config.port,
      method:   this.request.method,
      path:     this.request.url
    };

    return http.request(options, this._handleResponset);
  }

  /**
   * @private
   */
  _configure(config) {
    this.config = _.extend({
      host: 'localhost',
      port: 80
    }, config);
  }

  /**
   * @private
   */

  _handleResponset(res) {
    this.response.writeHead(res.statusCode, res.headers);
    res.pipe(this.response, {
      end: true
    });
  }
}

module.exports = function(config, request, response) {
  return new Request(config, request, response);
};

module.exports.fn = Request.prototype;
