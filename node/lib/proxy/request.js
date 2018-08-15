var http = require('http');

class Request {
  constructor(config, request, response) {
    this.config = config;
    this.request = request;
    this.response = response;
  }

  startRequest() {
    var options = {
      headers:  this.request.headers,
      hostname: this.config.proxy.host,
      port:     this.config.proxy.port,
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
