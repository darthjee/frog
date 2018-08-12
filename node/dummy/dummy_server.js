var http = require('http'),
    _ = require('underscore');

class DummyServer {
  constructor() {
    _.bindAll(this, '_handleRequest');

    this.server = http.createServer(this._handleRequest);
    this.body = 'data';
    this.statusCode = 200;
    this.headers = { 'Content-Type': 'text/plain' };
    this.port = 3000;
  }

  _handleRequest(request, response) {
    response.writeHead(this.statusCode, this.headers);
    response.write(this.body);
    response.end();
  }

  start() {
    this.server.listen(this.port);
  }

  stop() {
    this.server.close();
  }
}

module.exports = DummyServer;
