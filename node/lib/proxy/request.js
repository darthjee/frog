var http = require('http'),
  _ = require('../underscore_ext');

class Request {
  constructor(config, request, response) {
    this._configure(config);
    this.request = request;
    this.response = response;
  }

  _configure(config) {
    this.config = _.extend({
      host: 'localhost',
      port: 80
    }, config);
  }

  startRequest() {
    var options = {
      headers:  this.request.headers,
      hostname: this.config.host,
      port:     this.config.port,
      method:   this.request.method,
      path:     this.request.url
    };

    var that = this;

    return http.request(options, function (res) {
      that.response.writeHead(res.statusCode, res.headers);
      res.pipe(that.response, {
        end: true
      });
    });
  }
}

module.exports = function(config, request, response) {
  return new Request(config, request, response);
};

module.exports.fn = Request.prototype;
